import styles from '../css/Menu.module.css';

const Menu = ({ status, onClose, onNewGame, onHelp }) => {
	return (
		<div className={styles.backdrop}>
			<div className={styles.menu}>
				<div className={styles.titleBar}>
					<h3 className={styles.title}>Menu</h3>
					<button
						className='button cancel'
						onClick={() => { if (onClose instanceof Function) onClose() }}
					></button>
				</div>
				<ul className={styles.options}>
					<li
						className={`${styles.option} ${status === 'config' ? styles.disabled : null}`}
						onClick={() => { if (onNewGame instanceof Function) onNewGame() }}
					>New game</li>
					<li
						className={styles.option}
						onClick={() => { if (onHelp instanceof Function) onHelp() }}
					>Help</li>
				</ul>
			</div>
		</div>
	);
}

export default Menu;