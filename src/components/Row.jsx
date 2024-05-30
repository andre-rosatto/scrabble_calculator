import styles from '../css/Row.module.css';

const Row = ({ title, light, children }) => {
	return (
		<section className={styles.Row}>
			<div className={`${styles.titleBar}${light ? ' ' + styles.light : ''}`}>{title}</div>
			<ul>{children}</ul>
		</section>
	);
}

export default Row;