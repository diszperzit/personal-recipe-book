import React from 'react';
import styles from './Footer.module.css';

const footer = () => {
    return (
        <footer className={styles.Footer}>
            <p>
                <span>Icons made by </span>
                <a
                    href="https://www.flaticon.com/authors/smashicons"
                    title="Smashicons"
                >
                    Smashicons
                </a>
                <span> from </span>
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>
            </p>
        </footer>
    );
};

export default footer;