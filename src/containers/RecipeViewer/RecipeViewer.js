import styles from './RecipeViewer.module.css';

import Button from '../../components/Globals/UI/Button/Button';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';
import RecipeImage from '../../components/View/RecipeImage/RecipeImage';
import RecipeDifficulty from '../../components/View/RecipeDifficulty/RecipeDifficulty';
import RecipeTime from '../../components/View/RecipeTime/RecipeTime';
import RecipeIngredients from '../../components/View/RecipeIngredients/RecipeIngredients';
import RecipeSteps from '../../components/View/RecipeSteps/RecipeSteps';

import * as actions from '../../store/actions/actionIndex';
import { connect } from 'react-redux';

const RecipeViewer = props => {
    const editRecipe = index => {
        props.onSetEditedRecipe(index);
        props.history.push('/edit');
    };
    let recipeText = <Spinner />;
    if (props.fetched) {
        const recipe = props.recipes[props.activeRecipe - 1];

        recipeText = (
            <>
                <div className={styles.RecipeBox}>
                    <div className={styles.RecipeTitleBar}>
                        <h2 className={styles.RecipeTitle}>{recipe.name}</h2>
                        <RecipeTime time={recipe.time} />
                    </div>
                    <RecipeDifficulty difficulty={recipe.difficulty} />
                    <RecipeIngredients
                        ingredients={recipe.ingredients}
                    ></RecipeIngredients>
                </div>
                <div className={styles.RecipeImageMain}>
                    <RecipeImage
                        image={recipe.imageMain}
                        index={recipe.index}
                        category={recipe.category}
                        main
                    />
                </div>
                <div className={styles.RecipeSummaryWrapper}>
                    <RecipeSteps steps={recipe.steps}></RecipeSteps>
                </div>
                <div className={styles.RecipeImageSecondary}>
                    <RecipeImage
                        image={recipe.imageSecondary}
                        index={recipe.index}
                        category={recipe.category}
                    />
                </div>
            </>
        );
    }
    return (
        <div className={styles.RecipeViewerContainer}>
            <article className={styles.Recipe}>{recipeText}</article>
            <div className={styles.RecipeCTAs}>
                <Button
                    color={props.activeRecipe !== 1 ? 'red' : 'disabled'}
                    clicked={
                        props.activeRecipe !== 1
                            ? () => props.onSwitchViewedRecipe(-1)
                            : event => event.preventDefault()
                    }
                    type="button"
                    svgName="prev"
                >
                    Previous
                </Button>
                <Button
                    color="orange"
                    clicked={() => props.history.push('/')}
                    type="button"
                    svgName="list"
                >
                    Back to list
                </Button>
                <Button
                    color={props.authenticated ? 'blue' : 'disabled'}
                    clicked={
                        props.authenticated
                            ? () => editRecipe(props.activeRecipe)
                            : event => event.preventDefault()
                    }
                    svgName="pencil"
                >
                    Edit
                </Button>
                <Button
                    color={
                        props.activeRecipe !== props.recipes.length
                            ? 'green'
                            : 'disabled'
                    }
                    clicked={
                        props.activeRecipe !== props.recipes.length
                            ? () => props.onSwitchViewedRecipe(1)
                            : event => event.preventDefault()
                    }
                    type="button"
                    svgName="next"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
        fetched: state.recipe.fetched,
        recipes: state.recipe.recipes,
        activeRecipe: state.recipe.activeRecipe,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSwitchViewedRecipe: change =>
            dispatch(actions.switchViewedRecipe(change)),
        onSetEditedRecipe: index => dispatch(actions.setEditedRecipe(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeViewer);
