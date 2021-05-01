import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RecipeLister.module.css';

import ListElement from '../../components/List/ListElement/ListElement';
import Button from '../../components/Globals/UI/Button/Button';
import Checkbox from '../../components/Globals/UI/Checkbox/Checkbox';
import Search from '../../components/Globals/UI/Search/Search';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';

import * as actions from '../../store/actions/actionIndex';
import { connect } from 'react-redux';

const RecipeList = props => {
    console.log('RECIPELISTER IS RENDERING');
    const buttons = {
        maindish: 'Main Dish',
        breakfast: 'Breakfast',
        salad: 'Salad',
        soup: 'Soup',
        dessert: 'Dessert',
    };
    const [activeButtons, setActiveButtons] = useState(Object.keys(buttons));
    const [searchText, setSearchText] = useState('');

    const history = useHistory();

    const setSearch = event => {
        setSearchText(event.target.value);
    };

    const toggleFilter = (event, buttonName) => {
        let updatedActiveButtons = [...activeButtons];
        if (updatedActiveButtons.includes(buttonName)) {
            updatedActiveButtons.splice(
                updatedActiveButtons.indexOf(buttonName),
                1
            );
        } else {
            updatedActiveButtons.push(buttonName);
        }
        setActiveButtons(updatedActiveButtons);
    };

    const toggleListFilters = () => {
        props.onToggleListFilters();
    };

    const navigateToUpload = () => {
        if (props.authenticated) {
            history.push('/upload');
        }
    };

    const navigateToView = index => {
        history.push(`/view/${index}`);
    };

    let showedRecipes = <Spinner />;
    if (props.fetched) {
        showedRecipes = props.recipes
            .filter(recipe => {
                return (
                    recipe.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) &&
                    activeButtons.includes(
                        recipe.category.toLowerCase().replace(' ', '')
                    )
                );
            })
            .map(recipe => {
                return (
                    <ListElement
                        key={recipe.index}
                        index={recipe.index}
                        title={recipe.name}
                        thumbnail={recipe.imageThumbnail}
                        category={recipe.category}
                        clicked={() => navigateToView(recipe.index)}
                    ></ListElement>
                );
            });
    }
    if (props.recipeError) {
        showedRecipes = (
            <p className={styles.RecipeListError}>{props.recipeError}</p>
        );
    }

    let checkboxes = Object.entries(buttons).map(([key, name]) => (
        <Checkbox
            key={key}
            name={key}
            toggled={event => toggleFilter(event, key)}
            active={activeButtons.includes(key)}
        >
            {name}
        </Checkbox>
    ));

    let authButton = (
        <Button
            color="green"
            clicked={props.onToggleLoginModal}
            svgName="login"
        >
            Authenticate
        </Button>
    );
    if (props.authenticated) {
        authButton = (
            <Button color="red" clicked={props.onLogout} svgName="logout">
                Logout
            </Button>
        );
    }

    let listSectionClasses = [styles.RecipeList];
    if (!props.showListFilters) {
        listSectionClasses.push(styles.FiltersHidden);
    }

    return (
        <div className={styles.RecipeListContainer}>
            <section className={listSectionClasses.join(' ')}>
                <div className={styles.RecipeListControls}>
                    <div className={styles.RecipeListTitle}>
                        <h3>Filters</h3>
                    </div>
                    <div className={styles.RecipeListButtons}>{checkboxes}</div>
                    <div className={styles.RecipeListSearch}>
                        <Search changed={setSearch} />
                    </div>
                </div>
                <div className={styles.Recipes}>{showedRecipes}</div>
            </section>
            <div className={styles.RecipeListCTAs}>
                <Button
                    color={props.authenticated ? 'blue' : 'disabled'}
                    clicked={navigateToUpload}
                    svgName="upload"
                >
                    Upload new
                </Button>
                <Button
                    color="orange"
                    clicked={toggleListFilters}
                    svgName={props.showListFilters ? 'arrow-down' : 'arrow-up'}
                    show="mobile"
                >
                    {props.showListFilters ? 'Hide filters' : 'Show filters'}
                </Button>
                {authButton}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        showLoginModal: state.auth.showLoginModal,
        authenticated: state.auth.authenticated,
        loading: state.recipe.loading,
        fetched: state.recipe.fetched,
        recipes: state.recipe.recipes,
        showListFilters: state.recipe.showListFilters,
        recipeError: state.recipe.recipeError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleLoginModal: () => dispatch(actions.toggleLoginModal()),
        onLogout: () => dispatch(actions.logout()),
        onToggleListFilters: index =>
            dispatch(actions.toggleListFilters(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
