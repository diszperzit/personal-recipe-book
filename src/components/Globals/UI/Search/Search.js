import styles from './Search.module.css';

const Search = props => {
    return (
        <input
            type="text"
            name="searchRecipe"
            placeholder="Search by name..."
            className={styles.Search}
            onChange={props.changed}
        ></input>
    );
};

export default Search;
