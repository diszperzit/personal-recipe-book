import { useHistory, useParams } from 'react-router-dom';
import useTraceUpdate from '../../hooks/trace-update';
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
    console.log('RECIPEVIEWER IS RENDERING');
    const history = useHistory();
    const { id: recipeID } = useParams();
    useTraceUpdate(props);

    const backToList = () => {
        history.push(`/`);
    };
    const prevRecipe = () => {
        if (+recipeID === 1) return;
        history.push(`/view/${+recipeID - 1}`);
    };
    const nextRecipe = () => {
        if (+recipeID === props.recipes.length) return;
        history.push(`/view/${+recipeID + 1}`);
    };
    const editRecipe = () => {
        if (!props.authenticated) return;
        history.push(`/edit/${recipeID}`);
    };

    let recipeText = <Spinner />;
    if (props.fetched) {
        const recipe = props.recipes[recipeID - 1];
        if (recipe === undefined) {
            recipeText = (
                <p>
                    There are no recipes with this index! Please look for valid
                    indexes on the list page.
                </p>
            );
        } else {
            recipeText = (
                <>
                    <div className={styles.RecipeBox}>
                        <div className={styles.RecipeTitleBar}>
                            <h2 className={styles.RecipeTitle}>
                                {recipe.name}
                            </h2>
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
    }
    return (
        <div className={styles.RecipeViewerContainer}>
            <article className={styles.Recipe}>{recipeText}</article>
            <div className={styles.RecipeCTAs}>
                <Button
                    color={recipeID !== 1 ? 'red' : 'disabled'}
                    clicked={prevRecipe}
                    type="button"
                    svgName="prev"
                >
                    Previous
                </Button>
                <Button
                    color="orange"
                    clicked={backToList}
                    type="button"
                    svgName="list"
                >
                    Back to list
                </Button>
                <Button
                    color={props.authenticated ? 'blue' : 'disabled'}
                    clicked={editRecipe}
                    svgName="pencil"
                >
                    Edit
                </Button>
                <Button
                    color={
                        recipeID !== props.recipes.length ? 'green' : 'disabled'
                    }
                    clicked={nextRecipe}
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
    };
};

export default connect(mapStateToProps, null)(RecipeViewer);
