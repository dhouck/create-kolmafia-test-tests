import type { Configuration, GenerateTask, ParallelTasks } from "lint-staged/config";

import pkg from "./package.json" with { type: "json" };

const scripts = pkg.scripts;

function script(name: keyof typeof scripts): GenerateTask {
	return () => scripts[name];
}

// Operations on all files
const build_and_test: ParallelTasks = [script("build:dev"), script("test")];

// Note: mode FIX_CHANGED not supported because of more difficult parallelism
type Mode = "CHECK_CHANGED" | "CHECK_ALL" | "FIX_ALL";
const configs: Record<Mode, Configuration> = {
	CHECK_CHANGED: {
		"**/*.{m,c,}{t,j}s": "eslint",
		// Run everything in parallel
		"*": [["prettier --ignore-unknown --check", ...build_and_test]],
	},

	CHECK_ALL: {
		// Run everything in parallel
		"*": [[script("lint:check"), script("style:check"), ...build_and_test]],
	},

	FIX_ALL: {
		// Run fixers in parallel, then build&test
		"*": [script("lint:fix"), script("style:fix"), build_and_test],
	},
} as const;
function isMode(value: string): value is Mode {
	return value in configs;
}

function getMode(): Mode {
	const requested = process.env.precommit_mode;
	if (typeof requested === "undefined") {
		return "CHECK_CHANGED";
	} else if (isMode(requested)) {
		return requested;
	}

	const error =
		requested === "FIX_ALL"
			? "Mode FIX_ALL is not currently supported due to script order issues"
			: `${requested} is not a valid mode`;

	console.error(error);
	throw error;
}
const mode: Mode = getMode();

export default configs[mode] satisfies Configuration;
