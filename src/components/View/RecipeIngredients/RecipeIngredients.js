import styles from './RecipeIngredients.module.css';

import RecipeIngredient from './RecipeIngredient/RecipeIngredient';

const RecipeIngredients = props => {
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
        <>
            <h3>Ingredients</h3>
            <div className={styles.RecipeIngredients}>{ingredients}</div>
        </>
    );
};

export default RecipeIngredients;
