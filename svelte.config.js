import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: false,
      strict: true,
    }),
    paths: {
      base: "", // Important: empty string for user sites
      assets: "", // Optional: add this if you're having asset path issues
    },
  },
};

export default config;
