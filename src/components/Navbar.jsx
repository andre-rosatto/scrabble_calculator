import styles from '../css/Header.module.css';

const Navbar = ({ onMenu, children }) => {
	return (
		<div className={styles.Navbar}>
			<header className={styles.header}>
				<h1>Scrabble Calculator</h1>
				<button
					onClick={() => { if (onMenu instanceof Function) onMenu() }}
				></button>
			</header>
			<div className={styles.statusBar}>
				{children}
			</div>
		</div>
	);
}

export default Navbar;