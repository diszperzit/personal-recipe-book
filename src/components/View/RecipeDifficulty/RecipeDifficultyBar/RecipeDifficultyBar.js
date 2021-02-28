import React from 'react';
import styles from './RecipeDifficultyBar.module.css';

const recipeDifficultyBar = (props) => {
    let classes = [styles.RecipeDifficultyBar];
    if (props.filled) {
        classes.push(styles.Filled);
    }
    if (props.exact) {
        classes.push(styles.Exact);
    }
    return (
        <div className={classes.join(' ')}>
            <span className={styles.RecipeDifficultyText}>
                {props.children}
            </span>
        </div>
    );
};

export default recipeDifficultyBar;
