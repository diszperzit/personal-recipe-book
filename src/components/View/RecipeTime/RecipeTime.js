import styles from './RecipeTime.module.css';
import sprite from '../../../assets/images/gastronomy-icons.svg';

const RecipeTime = props => {
    let recipeTime = '';
    switch (true) {
        case props.time < 3:
            recipeTime = `${props.time * 60} minutes`;
            break;
        case props.time > 48:
            recipeTime = `${props.time / 24} days`;
            break;
        default:
            recipeTime = `${props.time} hours`;
            break;
    }
    return (
        <div className={styles.RecipeTime}>
            <svg>
                <use xlinkHref={`${sprite}#icon-clock`} />
            </svg>
            <span>{recipeTime}</span>
        </div>
    );
};

export default RecipeTime;
