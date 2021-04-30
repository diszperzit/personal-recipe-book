import styles from './RecipeImage.module.css';
import sprite from '../../../assets/images/gastronomy-icons.svg';

const RecipeImage = props => {
    const categoryName = props.category.replace(' ', '').toLowerCase();
    const categoryClasses = [styles.RecipeCategory, styles[categoryName]];

    let extras = '';
    if (props.main) {
        extras = (
            <>
                <span className={styles.RecipeIndex}>#{props.index}</span>
                <span className={categoryClasses.join(' ')}>
                    <svg>
                        <use
                            xlinkHref={`${sprite}#icon-dish-${categoryName}`}
                        />
                    </svg>
                    {props.category}
                </span>
            </>
        );
    }

    return (
        <>
            {extras}
            <img
                className={styles.RecipeThumbnail}
                src={
                    props.image
                        ? props.image
                        : 'https://via.placeholder.com/680x400'
                }
            />
        </>
    );
};

export default RecipeImage;
