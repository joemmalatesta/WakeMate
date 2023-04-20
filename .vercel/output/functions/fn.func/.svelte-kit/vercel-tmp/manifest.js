export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","sun.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.5c8d4743.js","imports":["_app/immutable/entry/start.5c8d4743.js","_app/immutable/chunks/index.f9f36618.js","_app/immutable/chunks/singletons.acf2fe9f.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.af0493f9.js","imports":["_app/immutable/entry/app.af0493f9.js","_app/immutable/chunks/index.f9f36618.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
