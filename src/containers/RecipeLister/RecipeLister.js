import React, { Component } from 'react';
import styles from './RecipeLister.module.css';
import { wrapGrid } from 'animate-css-grid';

import ListElement from '../../components/List/ListElement/ListElement';
import Button from '../../components/Globals/UI/Button/Button';
import Checkbox from '../../components/Globals/UI/Checkbox/Checkbox';
import Search from '../../components/Globals/UI/Search/Search';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';

import * as actions from '../../store/actions/actionIndex';
import { connect } from 'react-redux';

class RecipeList extends Component {
    state = {
        activeButtons: ['maindish', 'breakfast', 'salad', 'soup', 'dessert'],
        buttons: {
            maindish: 'Main Dish',
            breakfast: 'Breakfast',
            salad: 'Salad',
            soup: 'Soup',
            dessert: 'Dessert',
        },
        searchText: '',
    };

    navigateToUpload = () => {
        if (this.props.authenticated) {
            this.props.history.push('/edit');
        }
    };

    setSearch = (event) => {
        this.setState({ searchText: event.target.value });
    };

    toggleFilter = (event, buttonName) => {
        let updatedActiveButtons = [...this.state.activeButtons];
        if (updatedActiveButtons.includes(buttonName)) {
            updatedActiveButtons.splice(
                updatedActiveButtons.indexOf(buttonName),
                1
            );
        } else {
            updatedActiveButtons.push(buttonName);
        }
        this.setState({ activeButtons: updatedActiveButtons });
    };

    toggleListFilters = () => {
        this.props.onToggleListFilters();
    };

    setViewedRecipe = (index) => {
        console.log(this.props);
        this.props.onSetViewedRecipe(index);
        this.props.history.push('/view');
    };

    componentDidMount() {
        this.props.onSetEditedRecipe(false);
        // const grid = document.querySelector(styles.Recipes);
        // console.log(styles.Recipes);
        // console.log(grid);
        // wrapGrid(grid);
    }

    render() {
        let showedRecipes = <Spinner />;
        if (this.props.fetched) {
            showedRecipes = this.props.recipes
                .filter((recipe) => {
                    return (
                        recipe.name
                            .toLowerCase()
                            .includes(this.state.searchText.toLowerCase()) &&
                        this.state.activeButtons.includes(
                            recipe.category.toLowerCase().replace(' ', '')
                        )
                    );
                })
                .map((recipe) => {
                    return (
                        <ListElement
                            key={recipe.index}
                            index={recipe.index}
                            title={recipe.name}
                            thumbnail={recipe.imageThumbnail}
                            category={recipe.category}
                            clicked={() => this.setViewedRecipe(recipe.index)}
                        ></ListElement>
                    );
                });
        }
        if (this.props.recipeError) {
            showedRecipes = (
                <p className={styles.RecipeListError}>
                    {this.props.recipeError}
                </p>
            );
        }

        let checkboxes = Object.entries(this.state.buttons).map(
            ([key, name]) => (
                <Checkbox
                    key={key}
                    name={key}
                    toggled={(event) => this.toggleFilter(event, key)}
                    active={this.state.activeButtons.includes(key)}
                >
                    {name}
                </Checkbox>
            )
        );
        let authButton = (
            <Button
                color="green"
                clicked={this.props.onToggleLoginModal}
                svgName="login"
            >
                Authenticate
            </Button>
        );
        if (this.props.authenticated) {
            authButton = (
                <Button
                    color="red"
                    clicked={this.props.onLogout}
                    svgName="logout"
                >
                    Logout
                </Button>
            );
        }
        let listSectionClasses = [styles.RecipeList];
        if (!this.props.showListFilters) {
            listSectionClasses.push(styles.FiltersHidden);
        }

        return (
            <div className={styles.RecipeListContainer}>
                <section className={listSectionClasses.join(' ')}>
                    <div className={styles.RecipeListControls}>
                        <div className={styles.RecipeListTitle}>
                            <h3>Filters</h3>
                        </div>
                        <div className={styles.RecipeListButtons}>
                            {checkboxes}
                        </div>
                        <div className={styles.RecipeListSearch}>
                            <Search changed={this.setSearch} />
                        </div>
                    </div>
                    <div className={styles.Recipes}>{showedRecipes}</div>
                </section>
                <div className={styles.RecipeListCTAs}>
                    <Button
                        color={this.props.authenticated ? 'blue' : 'disabled'}
                        clicked={this.navigateToUpload}
                        svgName="upload"
                    >
                        Upload new
                    </Button>
                    <Button
                        color="orange"
                        clicked={this.toggleListFilters}
                        svgName={
                            this.props.showListFilters
                                ? 'arrow-down'
                                : 'arrow-up'
                        }
                        show="mobile"
                    >
                        {this.props.showListFilters
                            ? 'Hide filters'
                            : 'Show filters'}
                    </Button>
                    {authButton}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showLoginModal: state.auth.showLoginModal,
        authenticated: state.auth.authenticated,
        loading: state.recipe.loading,
        fetched: state.recipe.fetched,
        recipes: state.recipe.recipes,
        editedRecipe: state.recipe.editedRecipe,
        showListFilters: state.recipe.showListFilters,
        recipeError: state.recipe.recipeError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleLoginModal: () => dispatch(actions.toggleLoginModal()),
        onLogout: () => dispatch(actions.logout()),
        onSetViewedRecipe: (index) => dispatch(actions.setViewedRecipe(index)),
        onSetEditedRecipe: (index) => dispatch(actions.setEditedRecipe(index)),
        onToggleListFilters: (index) =>
            dispatch(actions.toggleListFilters(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
