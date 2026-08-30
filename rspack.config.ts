import { defineConfig } from "@rspack/cli";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";

export default defineConfig({
	entry: {
		"scripts/create-kolmafia-test-tests": "./src/main.ts",
	},
	externals: ["kolmafia"],
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|ts)$/,
				exclude: [/node_modules/],
				use: {
					loader: "babel-loader",
					options: {
						targets: { rhino: "1.9.1" },
						presets: ["@babel/preset-typescript", "@babel/preset-env"],
					},
					parallel: true,
				},
			},
		],
	},
	optimization: { emitOnErrors: false },
	output: {
		chunkFormat: "commonjs",
		clean: true,
		iife: false,
		// Differences between KoLmafia and es2016 target
		environment: {
			document: false,
			logicalAssignment: true,
			module: false,
			optionalChaining: true,
		},
		library: { type: "commonjs2" },
	},
	plugins: [new TsCheckerRspackPlugin({ async: false })],
	target: ["es2016"], // Platform is unrecognized, just use ecma version
});
