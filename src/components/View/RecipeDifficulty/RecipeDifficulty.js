import React from 'react';
import styles from './RecipeDifficulty.module.css';

import RecipeDifficultyBar from './RecipeDifficultyBar/RecipeDifficultyBar';

const recipeDifficulty = (props) => {
    const difficultyLevels = [
        'Plongeur',
        'Commis',
        'Cuisinier',
        'Saucier',
        'Chef',
    ];
    const difficultyLines = [
        'You can do this with your hands tied.',
        'It literally cooks itself.',
        'Not too shabby, perhaps good for a date?',
        'I sure hope you have sharpened your knives.',
        'Prepare to bask in blood and sweat.',
    ];
    const difficultyIndex = Number.parseInt(props.difficulty) - 1;
    let difficultyBars = [];
    for (let i = 0; i < difficultyLevels.length; i++) {
        difficultyBars.push(
            <RecipeDifficultyBar
                key={i}
                exact={difficultyIndex === i}
                filled={difficultyIndex >= i}
            >
                {difficultyLevels[i]}
            </RecipeDifficultyBar>
        );
    }
    return (
        <div>
            <div className={styles.RecipeDifficulty}>{difficultyBars}</div>
            <p className={styles.RecipeDifficultyLine}>
                {difficultyLines[difficultyIndex]}
            </p>
        </div>
    );
};

export default recipeDifficulty;
