import styles from './RecipeDifficultyBar.module.css';

const RecipeDifficultyBar = props => {
    let classes = [styles.RecipeDifficultyBar];
    if (props.filled) {
        classes.push(styles.Filled);
    }
    if (props.exact) {
        classes.push(styles.Exact);
    }
    return (
        <div className={classes.join(' ')}>
            <span className={styles.RecipeDifficultyText}>
                {props.children}
            </span>
        </div>
    );
};

export default RecipeDifficultyBar;
