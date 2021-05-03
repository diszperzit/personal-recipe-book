import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RecipeLister.module.css';

import ListElement from '../../components/List/ListElement/ListElement';
import Button from '../../components/Globals/UI/Button/Button';
import Checkbox from '../../components/Globals/UI/Checkbox/Checkbox';
import Search from '../../components/Globals/UI/Search/Search';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { recipeActions } from '../../store/recipe-slice';
import { logout } from '../../store/auth-actions';

const RecipeList = props => {
    const buttons = {
        maindish: 'Main Dish',
        breakfast: 'Breakfast',
        salad: 'Salad',
        soup: 'Soup',
        dessert: 'Dessert',
    };
    const [activeButtons, setActiveButtons] = useState(Object.keys(buttons));
    const [searchText, setSearchText] = useState('');

    const dispatch = useDispatch();
    const authenticated = useSelector(state => state.auth.authenticated);
    const fetched = useSelector(state => state.recipe.fetched);
    const recipes = useSelector(state => state.recipe.recipes);
    const showListFilters = useSelector(state => state.recipe.showListFilters);
    const recipeError = useSelector(state => state.recipe.recipeError);

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
        dispatch(recipeActions.toggleFilters());
    };

    const navigateToUpload = () => {
        if (authenticated) {
            history.push('/upload');
        }
    };
    const navigateToView = index => {
        history.push(`/view/${index}`);
    };

    const toggleAuthModal = () => {
        dispatch(authActions.toggleModal());
    };
    const logoutHandler = () => {
        dispatch(logout());
    };

    let showedRecipes = <Spinner />;
    if (fetched) {
        showedRecipes = recipes
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
    if (recipeError) {
        showedRecipes = <p className={styles.RecipeListError}>{recipeError}</p>;
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
        <Button color="green" clicked={toggleAuthModal} svgName="login">
            Authenticate
        </Button>
    );
    if (authenticated) {
        authButton = (
            <Button color="red" clicked={logoutHandler} svgName="logout">
                Logout
            </Button>
        );
    }

    let listSectionClasses = [styles.RecipeList];
    if (!showListFilters) {
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
                    color={authenticated ? 'blue' : 'disabled'}
                    clicked={navigateToUpload}
                    svgName="upload"
                >
                    Upload new
                </Button>
                <Button
                    color="orange"
                    clicked={toggleListFilters}
                    svgName={showListFilters ? 'arrow-down' : 'arrow-up'}
                    show="mobile"
                >
                    {showListFilters ? 'Hide filters' : 'Show filters'}
                </Button>
                {authButton}
            </div>
        </div>
    );
};

export default RecipeList;
