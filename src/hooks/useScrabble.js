import { useRef } from "react";

const languages = [
	{
		name: 'English',
		charset: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '],
		values: [1, 3, 2, 2, 1, 4, 4, 4, 1, 5, 2, 2, 1, 3, 1, 2, 6, 1, 1, 1, 1, 4, 2, 8, 2, 8, 0]
	},
	{
		name: 'Français',
		charset: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '],
		values: [1, 2, 2, 3, 1, 4, 2, 4, 1, 8, 10, 1, 2, 1, 1, 3, 8, 1, 1, 1, 1, 4, 10, 10, 10, 10, 0]
	},
	{
		name: 'Deutsch',
		charset: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ü', ' '],
		values: [1, 3, 4, 1, 1, 4, 2, 2, 1, 6, 4, 2, 3, 1, 2, 4, 10, 1, 1, 1, 1, 6, 3, 8, 10, 3, 6, 8, 6, 0]
	},
	{
		name: 'Português',
		charset: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Z', 'Ç', ' '],
		values: [1, 3, 2, 2, 1, 4, 4, 4, 1, 5, 2, 1, 3, 1, 2, 6, 1, 1, 1, 1, 4, 8, 8, 3, 0]
	}
];

const useLanguage = initialIdx => {
	const idx = useRef(typeof initialIdx === 'number' && initialIdx >= 0 && initialIdx < languages.length ? initialIdx : 0);

	const setLanguageIdx = languageIdx => idx.current = languageIdx;

	const getLetterValue = letter => languages[idx.current].values[languages[idx.current].charset.indexOf(letter)];

	const getWordScore = (word, letterMultipliers, wordMultipliers) => {
		let result = 0;
		word.split('').forEach((letter, letterIdx) => result += getLetterValue(letter) * letterMultipliers[letterIdx]);
		wordMultipliers.forEach(mult => result *= mult);
		return result;
	}

	const getTurnGrandTotal = turn => {
		let result = turn.words.reduce((acc, word, idx) => acc + getWordScore(word, turn.letterMultipliers[idx], turn.wordMultipliers[idx]), 0);
		if (turn.modifier === 'bonus') {
			result += 50;
		} else if (turn.modifier === 'subtract') {
			result *= -1;
		}
		return result;
	}

	return {
		languages: languages,
		currentIdx: idx.current,
		charset: languages[idx.current].charset,
		setLanguageIdx: setLanguageIdx,
		getLetterValue: getLetterValue,
		getWordScore: getWordScore,
		getTurnGrandTotal: getTurnGrandTotal
	}
}

export default useLanguage;