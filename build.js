const esbuild = require("esbuild");

esbuild.context({
  entryPoints: ["public/script.jsx"],
  bundle: true,
  outfile: "public/bundle.js",
  loader: { ".js": "jsx", ".jsx": "jsx" }
}).then(ctx => {
  ctx.watch();
  console.log("⚡ Build en watch...");
});