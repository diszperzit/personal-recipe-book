import styles from './RecipeStep.module.css';

const RecipeStep = props => {
    return (
        <div className={styles.RecipeStep}>
            <span className={styles.RecipeStepIndex}>{props.index}) </span>
            <span className={styles.RecipeStepDescription}>{props.step}</span>
        </div>
    );
};

export default RecipeStep;
