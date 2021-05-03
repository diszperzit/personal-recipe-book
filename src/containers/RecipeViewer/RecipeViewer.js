import { useHistory, useParams } from 'react-router-dom';
import styles from './RecipeViewer.module.css';

import ButtonList from '../../components/Globals/UI/ButtonList/ButtonList';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';
import RecipeImage from '../../components/View/RecipeImage/RecipeImage';
import RecipeDifficulty from '../../components/View/RecipeDifficulty/RecipeDifficulty';
import RecipeTime from '../../components/View/RecipeTime/RecipeTime';
import RecipeIngredients from '../../components/View/RecipeIngredients/RecipeIngredients';
import RecipeSteps from '../../components/View/RecipeSteps/RecipeSteps';

import { useSelector } from 'react-redux';

const RecipeViewer = props => {
    const { id: recipeID } = useParams();

    const authenticated = useSelector(state => state.auth.authenticated);
    const fetched = useSelector(state => state.recipe.fetched);
    const recipes = useSelector(state => state.recipe.recipes);

    const history = useHistory();

    const backToListHandler = () => {
        history.push(`/`);
    };
    const prevRecipeHandler = () => {
        if (+recipeID === 1) return;
        history.push(`/view/${+recipeID - 1}`);
    };
    const nextRecipeHandler = () => {
        if (+recipeID === recipes.length) return;
        history.push(`/view/${+recipeID + 1}`);
    };
    const editRecipeHandler = () => {
        if (!authenticated) return;
        history.push(`/edit/${recipeID}`);
    };

    let recipeText = <Spinner />;
    if (fetched) {
        const recipe = recipes[recipeID - 1];
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
    const buttonListConfig = [
        {
            type: 'button',
            color: recipeID !== 1 ? 'red' : 'disabled',
            clicked: prevRecipeHandler,
            svgName: 'prev',
            label: 'Previous',
            show: 'all',
        },
        {
            type: 'button',
            color: 'orange',
            clicked: backToListHandler,
            svgName: 'list',
            label: 'Back to list',
            show: 'all',
        },
        {
            type: 'button',
            color: authenticated ? 'blue' : 'disabled',
            clicked: editRecipeHandler,
            svgName: 'pencil',
            label: 'Edit ',
            show: 'all',
        },
        {
            type: 'button',
            color: recipeID !== recipes.length ? 'green' : 'disabled',
            clicked: nextRecipeHandler,
            svgName: 'next',
            label: 'Next',
            show: 'all',
        },
    ];

    return (
        <div className={styles.RecipeViewerContainer}>
            <article className={styles.Recipe}>{recipeText}</article>
            <ButtonList config={buttonListConfig} />
        </div>
    );
};

export default RecipeViewer;
