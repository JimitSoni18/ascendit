import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
// import devtools from "solid-devtools/vite";

export default defineConfig({
	resolve: {
		alias: {
			"@Components": path.resolve(__dirname, "./src/Components/"),
			"@Layouts": path.resolve(__dirname, "./src/Layouts/"),
			"@Pages": path.resolve(__dirname, "./src/Pages/"),
			"@Store": path.resolve(__dirname, "./src/Store"),
			"@hooks": path.resolve(__dirname, "./src/util/hooks"),
		},
	},
	plugins: [
		/* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
		// devtools(),
		solidPlugin(),
	],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:4000/",
			},
		},
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	esbuild: {
		legalComments: "none",
	},
});
