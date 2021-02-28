import React from 'react';
import styles from './ListElement.module.css';
import sprite from '../../../assets/images/gastronomy-icons.svg';

const listElement = (props) => {
    const categoryName = props.category.replace(' ', '').toLowerCase();
    const categoryClasses = [styles.RecipeCategory, styles[categoryName]].join(
        ' '
    );
    const titleClasses = [styles.RecipeTitle, styles[categoryName]].join(' ');

    return (
        <article
            className={styles.RecipeListElement}
            style={{
                background: `url(${
                    props.thumbnail
                        ? props.thumbnail
                        : 'https://via.placeholder.com/360x240'
                }) 0% 0% / cover no-repeat`,
            }}
            onClick={props.clicked}
        >
            <span className={styles.RecipeIndex}>#{props.index}</span>
            <span className={categoryClasses}>
                <svg>
                    <use xlinkHref={`${sprite}#icon-dish-${categoryName}`} />
                </svg>
            </span>
            <span className={titleClasses}>{props.title}</span>
        </article>
    );
};

export default listElement;
