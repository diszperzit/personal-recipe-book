import React from 'react';
import styles from './RecipeStep.module.css';

const recipeStep = (props) => {
    return (
        <div className={styles.RecipeStep}>
            <span className={styles.RecipeStepIndex}>{props.index}) </span>
            <span className={styles.RecipeStepDescription}>{props.step}</span>
        </div>
    );
};

export default recipeStep;
