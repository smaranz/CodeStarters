import { cp, mkdir, writeFile, rm } from "fs/promises";
import { join } from "path";
import { build } from "../node_modules/esbuild/lib/main.js";

const root = process.cwd();
const out = join(root, ".vercel/output");

await rm(out, { recursive: true, force: true });
await mkdir(join(out, "static"), { recursive: true });
await mkdir(join(out, "functions/index.func"), { recursive: true });

// Static assets served by Vercel CDN
await cp(join(root, "dist/client"), join(out, "static"), { recursive: true });

// Bundle the TanStack Start server + all npm deps into a single Node.js file.
// The server exports { default: { fetch(req, env, ctx) } } (Web Fetch API handler).
// We wrap it with a Node.js HTTP adapter for Vercel serverless functions.
const adapterSrc = `
import server from ${JSON.stringify(join(root, "dist/server/server.js"))};

export default async function handler(req, res) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers["host"] || "localhost";
  const url = new URL(req.url, \`\${proto}://\${host}\`);

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v == null) continue;
    if (Array.isArray(v)) v.forEach((s) => headers.append(k, s));
    else headers.set(k, v);
  }

  let body = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    if (chunks.length) body = Buffer.concat(chunks);
  }

  const webReq = new Request(url.toString(), { method: req.method, headers, body });
  const webRes = await server.fetch(webReq, {}, {});

  res.statusCode = webRes.status;
  for (const [k, v] of webRes.headers.entries()) res.setHeader(k, v);
  res.end(Buffer.from(await webRes.arrayBuffer()));
}
`;

// Write a temp entry file
const tmpEntry = join(root, ".vercel-adapter-tmp.mjs");
await writeFile(tmpEntry, adapterSrc);

await build({
  entryPoints: [tmpEntry],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: join(out, "functions/index.func/index.js"),
  splitting: false,
  packages: "bundle",
  external: [],
  minify: false,
  logLevel: "warning",
  // CJS packages bundled into ESM call require() for Node built-ins (e.g. react-dom/server).
  // Inject a createRequire shim at the top so those calls resolve correctly.
  banner: {
    js: `import { createRequire } from "module";\nconst require = createRequire(import.meta.url);`,
  },
});

// Clean up temp file
await rm(tmpEntry, { force: true });

// Tell Vercel this is a Node.js 20 serverless function
await writeFile(
  join(out, "functions/index.func/.vc-config.json"),
  JSON.stringify({ runtime: "nodejs20.x", handler: "index.js", launchTarget: "server" }, null, 2)
);

// Vercel Build Output API v3: static first, then function catch-all
await writeFile(
  join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index" },
      ],
    },
    null,
    2
  )
);

console.log("✓ .vercel/output/ created (Node.js serverless, fully bundled)");
