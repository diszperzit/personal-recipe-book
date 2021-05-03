import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RecipeLister.module.css';

import ListElement from '../../components/List/ListElement/ListElement';
import ButtonList from '../../components/Globals/UI/ButtonList/ButtonList';
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
    const navigateToView = useCallback(index => {
        history.push(`/view/${index}`);
    }, []);

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

    let listSectionClasses = [styles.RecipeList];
    if (!showListFilters) {
        listSectionClasses.push(styles.FiltersHidden);
    }

    const buttonListConfig = [
        {
            type: 'button',
            color: authenticated ? 'blue' : 'disabled',
            clicked: navigateToUpload,
            svgName: 'upload',
            label: 'Upload new',
            show: 'all',
        },
        {
            type: 'button',
            color: 'orange',
            clicked: toggleListFilters,
            svgName: showListFilters ? 'arrow-down' : 'arrow-up',
            label: showListFilters ? 'Hide filters' : 'Show filters',
            show: 'mobile',
        },
        {
            type: 'button',
            color: authenticated ? 'red' : 'green',
            clicked: authenticated ? logoutHandler : toggleAuthModal,
            svgName: authenticated ? 'logout' : 'login',
            label: authenticated ? 'Logout' : 'Authenticate',
            show: 'all',
        },
    ];

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
            <ButtonList config={buttonListConfig}></ButtonList>
        </div>
    );
};

export default RecipeList;
