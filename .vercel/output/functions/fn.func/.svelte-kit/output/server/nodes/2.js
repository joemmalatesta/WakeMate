import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
export const component = async () => (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/entry/_page.svelte.6b18ba23.js","_app/immutable/chunks/index.f9f36618.js"];
export const stylesheets = [];
export const fonts = [];
