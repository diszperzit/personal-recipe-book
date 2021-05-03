import { useState, useCallback } from 'react';
import { useHistory, useParams, Prompt } from 'react-router-dom';
import styles from './RecipeEditor.module.css';

import Input from '../../components/Globals/UI/Input/Input';
import ButtonList from '../../components/Globals/UI/ButtonList/ButtonList';
import EditIngredient from '../../components/Edit/EditIngredient/EditIngredient';
import EditStep from '../../components/Edit/EditStep/EditStep';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';

import { updateObject } from '../../helpers/utility';
import { useSelector, useDispatch } from 'react-redux';
import { uploadRecipe, deleteRecipe } from '../../store/recipe-actions';

const RecipeEditor = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);
    const fetched = useSelector(state => state.recipe.fetched);
    const recipes = useSelector(state => state.recipe.recipes);

    const history = useHistory();
    let { id: recipeID } = useParams();
    let { isEditing } = props;
    if (!isEditing) {
        recipeID = recipes.length;
    }
    const recipe = fetched && isEditing && recipes[recipeID - 1];
    if (recipe === undefined) {
        isEditing = false;
    }

    const initialFormState = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Fitness Chicken',
            },
            label: 'Recipe Name (4-30 characters)',
            value: isEditing ? recipe.name : '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 30,
            },
            valid: false,
        },
        category: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'Main Dish', displayValue: 'Main Dish' },
                    { value: 'Breakfast', displayValue: 'Breakfast' },
                    { value: 'Salad', displayValue: 'Salad' },
                    { value: 'Soup', displayValue: 'Soup' },
                    { value: 'Dessert', displayValue: 'Dessert' },
                ],
            },
            label: 'Dish Category',
            value: isEditing ? recipe.category : 'Main Dish',
            validation: {},
            valid: true,
        },
        time: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: '0,25',
                step: 0.25,
                min: 0.25,
            },
            label: 'Time To Cook (in hours, min 0,25)',
            value: isEditing ? recipe.time : '',
            validation: {
                required: true,
            },
            valid: false,
        },
        difficulty: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: '1', displayValue: '1' },
                    { value: '2', displayValue: '2' },
                    { value: '3', displayValue: '3' },
                    { value: '4', displayValue: '4' },
                    { value: '5', displayValue: '5' },
                ],
            },
            label: 'Difficulty Level (1-5)',
            value: isEditing ? recipe.difficulty : '1',
            validation: {},
            valid: true,
        },
        imageMain: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'e.g. https:/i.imgur.com...',
            },
            label: 'Image #1 (680 x 400) external URL',
            value: isEditing ? recipe.imageMain : '',
            validation: {
                required: true,
            },
            valid: true,
        },
        imageSecondary: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'e.g. https:/i.imgur.com...',
            },
            label: 'Image #2 (680 x 400) external URL',
            value: isEditing ? recipe.imageSecondary : '',
            validation: {
                required: true,
            },
            valid: true,
        },
        imageThumbnail: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'e.g. https:/i.imgur.com...',
            },
            label: 'Thumbnail (360 x 240) external URL',
            value: isEditing ? recipe.imageThumbnail : '',
            validation: {
                required: true,
            },
            valid: true,
        },
        index: {
            elementType: 'input',
            elementConfig: {
                type: 'hidden',
            },
            value: isEditing ? recipeID : recipes.length + 1,
            validation: {
                required: true,
            },
            valid: true,
        },
    };

    const [basics, setBasics] = useState(initialFormState);
    const [ingredients, setIngredients] = useState(
        isEditing && recipe.ingredients ? recipe.ingredients : {}
    );
    const [ingredientCount, setIngredientCount] = useState(
        isEditing ? recipe.ingredientCount : 0
    );
    const [steps, setSteps] = useState(
        isEditing && recipe.steps ? recipe.steps : {}
    );
    const [stepCount, setStepCount] = useState(
        isEditing ? recipe.stepCount : 0
    );

    const changeBasicData = useCallback(
        (event, inputIdentifier) => {
            const updatedFormElement = updateObject(basics[inputIdentifier], {
                value: event.target.value,
            });
            const updatedBasics = updateObject(basics, {
                [inputIdentifier]: updatedFormElement,
            });

            setBasics(updatedBasics);
        },
        [basics]
    );
    const changeIngredientData = useCallback(
        (event, identifier, inputName) => {
            const updatedIngredient = updateObject(ingredients[identifier], {
                [inputName]: event.target.value,
            });
            const updatedIngredients = updateObject(ingredients, {
                [identifier]: updatedIngredient,
            });
            setIngredients(updatedIngredients);
        },
        [ingredients]
    );
    const incrementIngredientCount = () => {
        const updatedIngredients = ingredients ? { ...ingredients } : [];
        const updatedIngredientCount = ingredientCount + 1;
        updatedIngredients[`ingredient${updatedIngredientCount}`] = {
            name: '',
            type: 'dairy',
            quantity: '',
            unit: '',
        };

        setIngredients(updatedIngredients);
        setIngredientCount(updatedIngredientCount);
    };
    const decrementIngredientCount = () => {
        if (ingredientCount === 0) return;
        const updatedIngredients = ingredients ? { ...ingredients } : [];
        const updatedIngredientCount = ingredientCount - 1;

        delete updatedIngredients[`ingredient${ingredientCount}`];

        setIngredients(updatedIngredients);
        setIngredientCount(updatedIngredientCount);
    };
    const changeStepData = useCallback(
        (event, identifier) => {
            const updatedSteps = updateObject(
                (steps, { ...steps, [identifier]: event.target.value })
            );
            setSteps(updatedSteps);
        },
        [steps]
    );
    const incrementStepCount = () => {
        const updatedSteps = steps ? { ...steps } : [];
        const updatedStepCount = stepCount + 1;

        updatedSteps[`step${updatedStepCount}`] = '';

        setSteps(updatedSteps);
        setStepCount(updatedStepCount);
    };
    const decrementStepCount = () => {
        if (stepCount === 0) return;
        const updatedSteps = steps ? { ...steps } : [];
        const updatedStepCount = stepCount - 1;

        delete updatedSteps[`step${stepCount}`];

        setSteps(updatedSteps);
        setStepCount(updatedStepCount);
    };

    const submitPrevent = event => {
        event.preventDefault();
    };
    const deleteRecipeHandler = () => {
        if (!isEditing) return;
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            dispatch(deleteRecipe(recipeID, token));
            history.push(`/`);
        }
    };
    const backToListHandler = () => {
        history.push(`/`);
    };
    const viewRecipeHandler = event => {
        event.preventDefault();
        if (!isEditing) return;
        history.push(`/view/${isEditing ? recipeID : ''}`);
    };
    const uploadRecipeHandler = () => {
        let recipeConfig = {};
        for (let identifier in basics) {
            recipeConfig[identifier] = basics[identifier].value;
        }

        const recipe = {
            ...recipeConfig,
            ingredients: ingredients,
            ingredientCount: ingredientCount,
            steps: steps,
            stepCount: stepCount,
        };
        dispatch(uploadRecipe(recipe, token));
        history.push(`/`);
    };

    const formElementsArray = [];
    for (let key in basics) {
        formElementsArray.push({
            id: key,
            config: basics[key],
        });
    }
    const basicsForm = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            name={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            label={formElement.config.label}
            value={formElement.config.value}
            changed={event => changeBasicData(event, formElement.id)}
        />
    ));
    let ingredientsForm = [];
    if (ingredients) {
        for (const [identifier, ingredient] of Object.entries(ingredients)) {
            ingredientsForm.push(
                <EditIngredient
                    key={identifier}
                    index={identifier}
                    changed={(event, identifier, inputName) =>
                        changeIngredientData(event, identifier, inputName)
                    }
                    ingredient={ingredient}
                ></EditIngredient>
            );
        }
    }

    let stepsForm = [];
    if (steps) {
        for (const [identifier, step] of Object.entries(steps)) {
            stepsForm.push(
                <EditStep
                    key={identifier}
                    index={identifier}
                    changed={(event, identifier) =>
                        changeStepData(event, identifier)
                    }
                    step={step}
                ></EditStep>
            );
        }
    }

    const buttonListConfig = [
        {
            type: 'button',
            color: isEditing ? 'red' : 'disabled',
            clicked: deleteRecipeHandler,
            svgName: 'delete',
            label: 'Delete recipe',
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
            color: isEditing ? 'blue' : 'disabled',
            clicked: viewRecipeHandler,
            svgName: 'return',
            label: 'View recipe',
            show: 'all',
        },
        {
            type: 'button',
            color: 'green',
            clicked: uploadRecipeHandler,
            svgName: 'upload',
            label: isEditing ? 'Confirm edit' : 'Confirm upload',
            show: 'all',
        },
    ];

    let contents = <Spinner />;
    if (fetched) {
        contents = (
            <div className={styles.RecipeEditorContainer}>
                {/* <Prompt message="Are you sure?" /> */}
                <form className={styles.RecipeEditor} onSubmit={submitPrevent}>
                    <div className={styles.Basics}>
                        <h3>Basics</h3>
                        <div className={styles.BasicsInputs}>{basicsForm}</div>
                    </div>
                    <div className={styles.Ingredients}>
                        <h3>
                            <span
                                onClick={decrementIngredientCount}
                                className={styles.LessButton}
                            >
                                -
                            </span>
                            Ingredients
                            <span
                                onClick={incrementIngredientCount}
                                className={styles.MoreButton}
                            >
                                +
                            </span>
                        </h3>
                        <div className={styles.IngredientsInputs}>
                            {ingredientsForm}
                        </div>
                    </div>
                    <div className={styles.Steps}>
                        <h3>
                            <span
                                onClick={decrementStepCount}
                                className={styles.LessButton}
                            >
                                -
                            </span>
                            Steps
                            <span
                                onClick={incrementStepCount}
                                className={styles.MoreButton}
                            >
                                +
                            </span>
                        </h3>
                        <div className={styles.StepsInputs}>{stepsForm}</div>
                    </div>
                </form>
                <ButtonList config={buttonListConfig} />
            </div>
        );
    }

    return contents;
};

export default RecipeEditor;
