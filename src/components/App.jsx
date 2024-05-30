import '../css/App.css';
import { useState } from 'react';
import Config from './Config';
import Game from './Game';
import useLocalStorage from '../hooks/useLocalStorage';
import Menu from './Menu';
import useIdGenerator from '../hooks/useIdGenerator';
import useLanguage from '../hooks/useScrabble';
import Help from './Help';

const LS_VERSION = '1.0';

const getNewRound = (players, roundId) => players.map(() => ({
	id: Math.floor(roundId),
	modifier: null,  // modifier -> null | 'bonus' | 'subtract'
	words: [],
	letterMultipliers: [],
	wordMultipliers: []
}));

function App() {
	const [ls, setLs] = useLocalStorage('scrabble-calculator');
	const [players, setPlayers] = useState(ls && ls.version === LS_VERSION ? ls.players : ['Player 1', 'Player 2']);
	// const [languageIdx, setLanguageIdx] = useState(ls && ls.version === LS_VERSION ? ls.languageIdx : 0);
	const language = useLanguage(ls && ls.version === LS_VERSION ? ls.languageIdx : 0);
	const [getId, setId] = useIdGenerator(ls && ls.version === LS_VERSION ? ls.rounds[ls.rounds.length - 1][0].id + 1 : 0);
	const [rounds, setRounds] = useState(ls && ls.version === LS_VERSION ? ls.rounds : [getNewRound(players, getId())]);
	const [status, setStatus] = useState('play');
	const [showMenu, setShowMenu] = useState(false);
	const [showHelp, setShowHelp] = useState(false);

	const handleConfigConfirm = (nextPlayerNames, nextLanguageIdx) => {
		setPlayers(nextPlayerNames);
		setId(0);
		language.setLanguageIdx(nextLanguageIdx);
		const nextRounds = [getNewRound(nextPlayerNames, getId())];
		setRounds(nextRounds);
		setLs({
			version: LS_VERSION,
			players: nextPlayerNames,
			languageIdx: nextLanguageIdx,
			rounds: nextRounds
		});
		setStatus('play');
	}

	const handleAddRound = () => {
		const nextRounds = [...rounds, getNewRound(players, getId())];
		setRounds(nextRounds);
		setLs({
			version: LS_VERSION,
			players: players,
			languageIdx: language.currentIdx,
			rounds: nextRounds
		});
	}

	const handleDeleteRound = idx => {
		const nextRounds = [...rounds];
		nextRounds.splice(idx, 1);
		setRounds(nextRounds);
		setLs({
			version: LS_VERSION,
			players: players,
			languageIdx: language.currentIdx,
			rounds: nextRounds
		});
	}

	const handleRoundsChange = nextRounds => {
		console.log(nextRounds);
		setRounds(nextRounds);
		setLs({
			version: LS_VERSION,
			players: players,
			languageIdx: language.currentIdx,
			rounds: nextRounds
		});
	}

	return (
		<div className="App">
			{/* config */}
			{status === 'config' &&
				<Config
					players={players}
					language={language}
					onMenu={() => setShowMenu(true)}
					onCancel={() => setStatus('play')}
					onConfirm={handleConfigConfirm}
				/>}

			{/* game */}
			{status === 'play' &&
				<Game
					players={players}
					rounds={rounds}
					language={language}
					onMenu={() => setShowMenu(true)}
					onAddRound={handleAddRound}
					onDeleteRound={handleDeleteRound}
					onRoundsChange={handleRoundsChange}
				/>
			}

			{/* menu */}
			{showMenu &&
				<Menu
					status={status}
					onNewGame={() => {
						setShowMenu(false);
						setStatus('config');
					}}
					onHelp={() => {
						setShowMenu(false);
						setShowHelp(true);
					}}
					onClose={() => setShowMenu(false)}
				/>
			}

			{/* help */}
			{showHelp &&
				<Help
					initialTab={status}
					onClose={() => setShowHelp(false)}
				/>
			}
		</div>
	);
}

export default App;
