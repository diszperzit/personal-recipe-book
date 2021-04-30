import styles from './Spinner.module.css';

const Spinner = () => (
    <div className={styles.SpinnerWrapper}>
        <div className={styles.Spinner}>Loading...</div>
    </div>
);

export default Spinner;
