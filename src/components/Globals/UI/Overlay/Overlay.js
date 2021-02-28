import React from 'react';
import styles from './Overlay.module.css';

const overlay = (props) => {
    return <div className={styles.Overlay} onClick={props.clicked}></div>;
};

export default overlay;
