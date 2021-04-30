import styles from './RecipeIngredient.module.css';
import sprite from '../../../../assets/images/gastronomy-icons.svg';

const RecipeIngredient = props => {
    const quantity =
        props.quantity === '' ? `to taste` : `${props.quantity} ${props.unit}`;
    return (
        <div className={styles.RecipeIngredient}>
            <svg>
                <use xlinkHref={`${sprite}#icon-ingredient-${props.type}`} />
            </svg>
            <span className={styles.RecipeIngredientName}>{props.name}</span>
            <span className={styles.RecipeIngredientQy}>{quantity}</span>
        </div>
    );
};

export default RecipeIngredient;
