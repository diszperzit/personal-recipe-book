import React from 'react';
import styles from './RecipeIngredients.module.css';

import RecipeIngredient from './RecipeIngredient/RecipeIngredient';

const recipeIngredients = (props) => {
    let ingredients = '';
    if (props.ingredients) {
        ingredients = Object.entries(props.ingredients).map(([slug, data]) => {
            return (
                <RecipeIngredient
                    key={slug}
                    name={data.name}
                    type={data.type}
                    quantity={data.quantity}
                    unit={data.unit}
                ></RecipeIngredient>
            );
        });
    }
    return (
        <React.Fragment>
            <h3>Ingredients</h3>
            <div className={styles.RecipeIngredients}>{ingredients}</div>
        </React.Fragment>
    );
};

export default recipeIngredients;
