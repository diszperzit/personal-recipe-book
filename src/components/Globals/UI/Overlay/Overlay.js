import styles from './Overlay.module.css';

const Overlay = props => {
    return <div className={styles.Overlay} onClick={props.clicked}></div>;
};

export default Overlay;
