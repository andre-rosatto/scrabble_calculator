import styles from '../css/Config.module.css';
import { useState } from 'react';
import Navbar from "./Navbar";
import Row from "./Row";
import Radiobox from './Radiobox';

const MAX_PLAYER_NAME_SIZE = 12;

const Config = ({ players, language, onMenu, onCancel, onConfirm }) => {
	const [tempPlayers, setTempPlayer] = useState(() => {
		const result = [...players];
		while (result.length < 4) result.push('');
		return result;
	});
	const [tempLanguageIdx, setTempLanguageIdx] = useState(language.currentIdx);

	const handlePlayerNameChange = (e, idx) => {
		let value = e.target.value.trimStart().substring(0, MAX_PLAYER_NAME_SIZE);
		const nextPlayerNames = [...tempPlayers];
		nextPlayerNames[idx] = value;
		setTempPlayer(nextPlayerNames);
	}

	const handlePlayerNameBlur = (e, idx) => {
		if (idx <= 1 && !e.target.value) {
			const nextPlayerNames = [...tempPlayers];
			nextPlayerNames[idx] = `Player ${idx + 1}`;
			setTempPlayer(nextPlayerNames);
		}
	}

	const handleConfirm = () => {
		if (onConfirm instanceof Function) {
			onConfirm(tempPlayers.filter(name => name.length > 0), tempLanguageIdx);
		}
	}

	return (
		<>
			{/* Navbar */}
			<Navbar
				onMenu={() => { if (onMenu instanceof Function) onMenu() }}
			>
				<button
					className='button cancel'
					onClick={() => {
						if (onCancel instanceof Function) onCancel();
					}}
				></button>
				<h2 className={styles.statusBarTitle}>New game</h2>
				<button
					className='button ok'
					onClick={handleConfirm}
				></button>
			</Navbar>

			{/* Player section */}
			<Row title={<h3>Players</h3>}>
				{tempPlayers.map((name, idx) =>
					<li
						key={idx}
						className={styles.li}
					>
						<input
							className={styles.nameInput}
							type='text'
							value={name}
							onChange={e => handlePlayerNameChange(e, idx)}
							onBlur={e => handlePlayerNameBlur(e, idx)}
						/>
					</li>
				)}
			</Row >

			{/* Language section */}
			<Row
				title={<h3>Languages</h3>}
				light={true}
			>
				{language.languages.map((language, idx) =>
					<li key={idx} className={styles.li}>
						<Radiobox
							checked={idx === tempLanguageIdx}
							onCheck={() => setTempLanguageIdx(idx)}
						>
							<h3>{language.name}</h3>
						</Radiobox>
						<p className={styles.charset}>
							{language.charset.filter(char => char !== ' ').join(' ')}
						</p>
					</li>
				)}
			</Row>
		</>
	);
}

export default Config;