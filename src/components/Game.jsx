import styles from '../css/Game.module.css';
import Navbar from './Navbar';
import Round from './Round';

const Game = ({ players, rounds, language, onMenu, onAddRound, onDeleteRound, onRoundsChange }) => {
	const handleModifierChange = (roundIdx, turnIdx, modifier) => {
		const nextRounds = [...rounds];
		const currentModifier = nextRounds[roundIdx][turnIdx].modifier;
		nextRounds[roundIdx][turnIdx].modifier = currentModifier === modifier ? null : modifier;
		if (onRoundsChange instanceof Function) onRoundsChange(nextRounds);
	}

	const handleRoundChange = (roundIdx, nextRound) => {
		if (onRoundsChange instanceof Function) {
			const nextRounds = [...rounds];
			nextRounds[roundIdx] = nextRound;
			onRoundsChange(nextRounds);
		}
	}

	const getGrandTotal = playerIdx => {
		let result = 0;
		for (let round of rounds) {
			result += language.getTurnGrandTotal(round[playerIdx]);
		}
		return result;
	}

	return (
		<>
			{/* Navbar */}
			<Navbar
				onMenu={() => { if (onMenu instanceof Function) onMenu() }}
			>
				<ul className={styles.statusBarScores}>
					{players.map((player, playerIdx) =>
						<li key={playerIdx}>
							{player}: {getGrandTotal(playerIdx)}
						</li>
					)}
				</ul>
			</Navbar>

			{/* Rounds */}
			<ul className={styles.roundsWrapper}>
				{rounds.map((round, roundIdx) => (
					<Round
						key={round[0].id}
						round={round}
						roundIdx={roundIdx}
						isTopmost={roundIdx === rounds.length - 1}
						players={players}
						language={language}
						onAddRound={() => { if (onAddRound instanceof Function) onAddRound() }}
						onDeleteRound={() => { if (onDeleteRound instanceof Function) onDeleteRound(roundIdx) }}
						onModifierChange={handleModifierChange}
						onRoundChange={handleRoundChange}
					>
					</Round>
				))}
			</ul>
		</>
	);
}

export default Game;