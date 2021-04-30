import styles from './RecipeSwitcher.module.css';

const RecipeSwitcher = props => {
    let switcherClasses = [styles.RecipeSwitcher, styles[props.direction]];
    if (props.disabled) {
        switcherClasses.push(styles.Disabled);
    }
    return (
        <div
            className={switcherClasses.join(' ')}
            onClick={props.clicked}
        ></div>
    );
};

export default RecipeSwitcher;
