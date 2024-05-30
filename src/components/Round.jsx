import { useState } from 'react';
import styles from '../css/Round.module.css';
import Row from './Row';

const MAX_WORD_SIZE = 15;

const Round = ({ round, roundIdx, isTopmost, players, language, onAddRound, onDeleteRound, onModifierChange, onRoundChange }) => {
	const [newWords, setNewWords] = useState(new Array(players.length).fill(''));

	const handleWordInputChange = (turnIdx, e) => {
		const nextValue = e.target.value.split('').filter(char => language.charset.includes(char.toUpperCase())).join('');
		const nextNewWords = [...newWords];
		nextNewWords[turnIdx] = nextValue.toUpperCase().substring(0, MAX_WORD_SIZE);
		setNewWords(nextNewWords);
	}

	const handleAddClick = (turnIdx) => {
		if (newWords[turnIdx].length === 0) return;
		const nextRound = [...round];
		const word = newWords[turnIdx];
		nextRound[turnIdx].words.push(word);
		nextRound[turnIdx].wordMultipliers.push(new Array(word.length).fill(1));
		nextRound[turnIdx].letterMultipliers.push(new Array(word.length).fill(1));
		if (onRoundChange instanceof Function) onRoundChange(roundIdx, nextRound);
		const nextNewWords = [...newWords];
		nextNewWords[turnIdx] = '';
		setNewWords(nextNewWords);
	}

	const handleTileClick = (turnIdx, wordIdx, letterIdx) => {
		const nextRound = [...round];
		const multiplierText = getBonusText(turnIdx, wordIdx, letterIdx);
		switch (multiplierText) {
			case '':
				nextRound[turnIdx].letterMultipliers[wordIdx][letterIdx] = 2;
				break;
			case 'DL':
				nextRound[turnIdx].letterMultipliers[wordIdx][letterIdx] = 3;
				break;
			case 'TL':
				nextRound[turnIdx].letterMultipliers[wordIdx][letterIdx] = 1;
				nextRound[turnIdx].wordMultipliers[wordIdx][letterIdx] = 2;
				break;
			case 'DW':
				nextRound[turnIdx].wordMultipliers[wordIdx][letterIdx] = 3;
				break;
			default:
				nextRound[turnIdx].letterMultipliers[wordIdx][letterIdx] = 1;
				nextRound[turnIdx].wordMultipliers[wordIdx][letterIdx] = 1;
		}
		if (onRoundChange instanceof Function) onRoundChange(nextRound);
	}

	const handleDeleteClick = (turnIdx, wordIdx) => {
		const nextRound = [...round];
		nextRound[turnIdx].words.splice(wordIdx, 1);
		nextRound[turnIdx].letterMultipliers.splice(wordIdx, 1);
		nextRound[turnIdx].wordMultipliers.splice(wordIdx, 1);
		if (onRoundChange instanceof Function) onRoundChange(nextRound);
	}

	const getBonusText = (turnIdx, wordIdx, letterIdx) => {
		const letterMult = round[turnIdx].letterMultipliers[wordIdx][letterIdx];
		const wordMult = round[turnIdx].wordMultipliers[wordIdx][letterIdx];
		if (letterMult === 2) {
			return 'DL'
		} else if (letterMult === 3) {
			return 'TL'
		} else if (wordMult === 2) {
			return 'DW'
		} else if (wordMult === 3) {
			return 'TW'
		} else {
			return '';
		}
	}

	const getTileClass = (turnIdx, wordIdx, letterIdx) => {
		const wordMult = getBonusText(turnIdx, wordIdx, letterIdx);
		switch (wordMult) {
			case 'DL':
				return `${styles.tile} ${styles.doubleLetter}`;
			case 'TL':
				return `${styles.tile} ${styles.tripleLetter}`;
			case 'DW':
				return `${styles.tile} ${styles.doubleWord}`;
			case 'TW':
				return `${styles.tile} ${styles.tripleWord}`;
			default:
				return styles.tile;
		}
	}

	return (
		<li>
			<Row
				title={<>
					{isTopmost &&
						<button
							className='button add'
							onClick={() => { if (onAddRound instanceof Function) onAddRound() }}
						></button>
					}
					<h3>{roundIdx + 1}</h3>
					{!isTopmost &&
						<button
							className='button delete'
							onClick={() => { if (onDeleteRound instanceof Function) onDeleteRound() }}
						></button>
					}
				</>}
				light={roundIdx % 2 !== 0}
			>
				{round.map((turn, turnIdx) => (
					<li key={turnIdx} className={styles.turnWrapper}>
						{/* inputbar */}
						<div className={styles.turnGrid}>
							<div className={styles.inputWrapper}>
								<h4 className={styles.playerName}>{players[turnIdx]}</h4>
								<input
									type='text'
									className={styles.wordInput}
									placeholder='New word'
									value={newWords[turnIdx]}
									onChange={e => handleWordInputChange(turnIdx, e)}
								/>
								<button
									className='button add'
									onClick={() => handleAddClick(turnIdx)}
								></button>
								<button
									className={`button bonus${turn.modifier === 'bonus' ? ' down' : ''}`}
									onClick={() => { if (onModifierChange instanceof Function) onModifierChange(roundIdx, turnIdx, 'bonus') }}
								></button>
								<button
									className={`button subtract${turn.modifier === 'subtract' ? ' down' : ''}`}
									onClick={() => { if (onModifierChange instanceof Function) onModifierChange(roundIdx, turnIdx, 'subtract') }}
								></button>
							</div>
							<div className={styles.turnGrandTotal}>{language.getTurnGrandTotal(turn)}</div>
						</div>
						{turn.words.map((word, wordIdx) =>
							<div key={wordIdx} className={`${styles.turnGrid} ${styles.entryWrapper}`}>
								<div className={styles.tilesWrapper}>
									{word.split('').map((letter, letterIdx) =>
										<div
											key={letterIdx}
											className={getTileClass(turnIdx, wordIdx, letterIdx)}
											onClick={() => handleTileClick(turnIdx, wordIdx, letterIdx)}
										>
											<span className={styles.tileBonus}>{getBonusText(turnIdx, wordIdx, letterIdx)}</span>
											<span className={styles.tileLetter}>{letter}</span>
											<span className={styles.tileValue}>{language.getLetterValue(letter) || ''}</span>
										</div>
									)}
								</div>
								<div className={styles.wordScoreWrapper}>
									<button
										className='button delete large'
										onClick={() => handleDeleteClick(turnIdx, wordIdx)}
									></button>
									<span className={styles.wordScore}>
										{/* {getWordScore(turn, wordIdx, languageIdx)} */}
										{language.getWordScore(word, turn.letterMultipliers[wordIdx], turn.wordMultipliers[wordIdx])}
									</span>
								</div>
							</div>)}
					</li>
				))}
			</Row>
		</li>
	);
}

export default Round;