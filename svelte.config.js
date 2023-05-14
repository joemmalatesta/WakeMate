import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-vercel';


/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  vitePlugin: {
    experimental: {
      inspector : true,
    }
  },
  preprocess: vitePreprocess()
};

export default config;