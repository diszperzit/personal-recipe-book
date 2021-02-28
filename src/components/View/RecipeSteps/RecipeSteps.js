import React from 'react';
import styles from './RecipeSteps.module.css';

import RecipeStep from './RecipeStep/RecipeStep';

const recipeSteps = (props) => {
    let steps = '';
    if (props.steps) {
        steps = Object.entries(props.steps).map(([slug, data]) => {
            return (
                <RecipeStep
                    key={slug}
                    index={slug.substring(4)}
                    step={data}
                ></RecipeStep>
            );
        });
    }
    return (
        <React.Fragment>
            <h3>Recipe</h3>
            <div className={styles.RecipeSteps}>{steps}</div>
        </React.Fragment>
    );
};

export default recipeSteps;
