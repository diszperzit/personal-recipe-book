import React from 'react';
import styles from './RecipeImage.module.css';
import sprite from '../../../assets/images/gastronomy-icons.svg';

const recipeImage = (props) => {
    const categoryName = props.category.replace(' ', '').toLowerCase();
    const categoryClasses = [styles.RecipeCategory, styles[categoryName]];

    let extras = '';
    if (props.main) {
        extras = (
            <React.Fragment>
                <span className={styles.RecipeIndex}>#{props.index}</span>
                <span className={categoryClasses.join(' ')}>
                    <svg>
                        <use
                            xlinkHref={`${sprite}#icon-dish-${categoryName}`}
                        />
                    </svg>
                    {props.category}
                </span>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {extras}
            <img
                className={styles.RecipeThumbnail}
                src={
                    props.image
                        ? props.image
                        : 'https://via.placeholder.com/680x400'
                }
            />
        </React.Fragment>
    );
};

export default recipeImage;
