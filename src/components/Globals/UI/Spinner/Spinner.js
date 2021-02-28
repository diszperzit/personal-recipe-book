import React from 'react';

import styles from './Spinner.module.css';

const spinner = () => (
    <div className={styles.SpinnerWrapper}>
        <div className={styles.Spinner}>Loading...</div>
    </div>
);

export default spinner;
