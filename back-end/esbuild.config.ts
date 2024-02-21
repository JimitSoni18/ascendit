import * as esbuild from "esbuild";
import fs from "fs";

esbuild
	.build({
		entryPoints: ["src/server.js"],
		sourcemap: "external",
		write: false,
		bundle: true,
		treeShaking: true,
		platform: "node",
		outdir: "dist",
		legalComments: "none",
		minify: true,
		minifyIdentifiers: true,
		minifySyntax: true,
		minifyWhitespace: true,
	})
	.then((result) => {
		fs.mkdirSync("dist");
		for (let out of result.outputFiles) {
			// console.log(out.path, out.contents, out.hash, out.text);
			fs.writeFileSync("dist/server.js", out.contents);
			// console.log(out.path, out.hash);
		}
	});
