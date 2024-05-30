import styles from '../css/Radiobox.module.css';

const Radiobox = ({ checked, children, onCheck }) => {
	const handleChange = (e) => {
		const nextChecked = !checked;
		if (nextChecked && onCheck instanceof Function) {
			onCheck(e);
		}
	}

	return (
		<label
			className={`${styles.Radiobox}${checked ? ' ' + styles.checked : ''}`}
		>
			<div className={styles.box}>
				<div className={styles.mark}></div>
			</div>
			<input
				type='checkbox'
				checked={checked}
				onChange={handleChange}
			/>
			{children}
		</label>
	);
}

export default Radiobox;