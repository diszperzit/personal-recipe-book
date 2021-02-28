import React from 'react';
import styles from './Header.module.css';

import { Link } from 'react-router-dom';

const header = () => {
    return (
        <header className={styles.Header}>
            <Link to="/">
                <h1>100 Recipes To Save Your Stomach</h1>
            </Link>
        </header>
    );
};

export default header;
