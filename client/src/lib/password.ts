import { type OptionsType, zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import * as zxcvbnFrPackage from "@zxcvbn-ts/language-fr";

const options: OptionsType = {
	dictionary: {
		...zxcvbnCommonPackage.dictionary,
		...zxcvbnFrPackage.dictionary,
		...zxcvbnEnPackage.dictionary,
	},
	graphs: zxcvbnCommonPackage.adjacencyGraphs,
	translations: zxcvbnFrPackage.translations,
};

zxcvbnOptions.setOptions(options);

export const MIN_PASSWORD_STRENGTH = 3;

export const checkPasswordStrength = (password: string) => {
	const result = zxcvbn(password);

	return {
		score: result.score,
		isStrong: result.score >= MIN_PASSWORD_STRENGTH,
	};
};
