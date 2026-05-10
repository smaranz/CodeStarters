import { cp, mkdir, writeFile, rm } from "fs/promises";
import { join } from "path";

const root = process.cwd();
const out = join(root, ".vercel/output");

await rm(out, { recursive: true, force: true });
await mkdir(join(out, "static"), { recursive: true });
await mkdir(join(out, "functions/index.func"), { recursive: true });

// Static assets served directly by Vercel CDN
await cp(join(root, "dist/client"), join(out, "static"), { recursive: true });

// Copy entire server bundle into the edge function directory
await cp(join(root, "dist/server"), join(out, "functions/index.func"), { recursive: true });

// Thin wrapper: server.js exports { default: { fetch(req, env, ctx) } }
// Vercel Edge needs a plain function as the default export
const wrapper = `import server from "./server.js";
export default function handler(request, ctx) {
  return server.fetch(request, {}, ctx ?? {});
}
`;
await writeFile(join(out, "functions/index.func/index.js"), wrapper);

// Tell Vercel this function runs on the Edge (V8 isolate, Fetch API)
await writeFile(
  join(out, "functions/index.func/.vc-config.json"),
  JSON.stringify({ runtime: "edge", entrypoint: "index.js" }, null, 2)
);

// Vercel Build Output API v3 routing:
// 1. Try static files first
// 2. Fall through to the edge function for everything else
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

console.log("✓ .vercel/output/ created (Build Output API v3)");
