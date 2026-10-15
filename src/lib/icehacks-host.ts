const ICEHACKS_HOST = "icehacks.codestarters.org";

export function isIceHacksHost() {
  if (typeof window !== "undefined") {
    return window.location.hostname === ICEHACKS_HOST;
  }
  return (globalThis as { __csHost?: string }).__csHost === ICEHACKS_HOST;
}

export const ICEHACKS_DEVPOST_URL = "https://icehacks.devpost.com/";
