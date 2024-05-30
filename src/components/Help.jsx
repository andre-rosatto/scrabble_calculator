import styles from '../css/Help.module.css';
import { useState } from "react"

import help0 from '../assets/help0.webp';
import help1 from '../assets/help1.webp';
import help2 from '../assets/help2.webp';
import help3 from '../assets/help3.webp';
import help4 from '../assets/help4.webp';

const Help = ({ initialTab, onClose }) => {
	const [tab, setTab] = useState(initialTab);

	return (
		<div className={styles.backdrop}>
			<div className={styles.window}>
				<div className={styles.titleBar}>
					<h3 className={styles.title}>Help</h3>
					<button
						className='button cancel'
						onClick={() => { if (onClose instanceof Function) onClose() }}
					></button>
				</div>
				<ul className={styles.tabsWrapper}>
					<li
						className={tab === 'config' ? `${styles.tab} ${styles.active}` : styles.tab}
						onClick={() => setTab('config')}
					>New game</li>
					<li
						className={tab === 'play' ? `${styles.tab} ${styles.active}` : styles.tab}
						onClick={() => setTab('play')}
					>Scoring</li>
				</ul>
				<section className={styles.contentWrapper}>
					{/* new game help tab content */}
					{tab === 'config' && <>
						<p>The New Game Window is split into two main parts:</p>
						<img src={help0} alt="players section" />
						<p>Tap the player names to set up how many players there are and their names. There must be at least two players.</p>
						<img src={help1} alt="alphabets section" />
						<p>In the Alphabet section, choose the language the game will be played in. This affects the character set available during the game as well as the letter values.</p>
						<p>At the top of the screen, tap<span className={styles.buttonOk}></span>to start a new game, or<span className={styles.buttonDelete}></span>to cancel the changes and return to the game.</p>
					</>}

					{/* scoring help tab content */}
					{tab === 'play' && <>
						<p>A game is split into rounds.</p>
						<img src={help2} alt="example of a round" />
						<p>In the vertical bar, you can tap<span className={styles.buttonAdd}></span>to start a new round, or<span className={styles.buttonDelete}></span>to delete it.</p>
						<p>Insert new words in the input box, then tap<span className={styles.buttonAdd}></span>to add them. You can add as many words as needed. Spaces count as empty letter tiles. Leave the input box empty if the player passes their turn.</p>
						<p>Tap<span className={styles.buttonBonus}></span>to add 50 points bonus if the player uses all their letters.</p>
						<p>When the game is over, add the remaining letters as a normal word, and tap<span className={styles.buttonSubtract}></span>to subtract the points instead of adding them.</p>
						<p>To the right of each player's words, you can see the grand total for the round as well as the points for each word. Tap<span className={`${styles.buttonDelete} ${styles.buttonLarge}`}></span>to the right of a word to delete it.</p>
						<p>Bonus squares are set by tapping the letter tiles. Tapping them will cycle through Double Letter, Triple Letter, Double Word, Triple Word, and back to normal:</p>
						<img src={help3} alt="bonus squares cycle" />
						<p>The bar at the top shows the grand total for each player:</p>
						<img src={help4} alt="grand total bar" />
					</>}
				</section>
			</div>
		</div>
	)
}

export default Help;