import { useState } from 'react';
import styles from './RecipeEditor.module.css';

import Input from '../../components/Globals/UI/Input/Input';
import Button from '../../components/Globals/UI/Button/Button';
import EditIngredient from '../../components/Edit/EditIngredient/EditIngredient';
import EditStep from '../../components/Edit/EditStep/EditStep';

import { updateObject } from '../../helpers/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actionIndex';

const RecipeEditor = props => {
    const initialFormState = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Fitness Chicken',
            },
            label: 'Recipe Name (4-30 characters)',
            value: props.editedRecipe
                ? props.recipes[props.editedRecipe - 1].name
                : '',
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
            value: props.editedRecipe
                ? props.recipes[props.editedRecipe - 1].category
                : 'Main Dish',
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
            value: props.editedRecipe
                ? props.recipes[props.editedRecipe - 1].time
                : '',
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
            value: props.editedRecipe
                ? props.recipes[props.editedRecipe - 1].difficulty
                : '1',
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
            value: props.editedRecipe
                ? props.recipes[props.editedRecipe - 1].imageMain
                : '',
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
            value: props.editedRecipe
                ? props.recipes[props.editedRecipe - 1].imageSecondary
                : '',
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
            value: props.editedRecipe
                ? props.recipes[props.editedRecipe - 1].imageThumbnail
                : '',
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
            value: props.editedRecipe
                ? props.editedRecipe
                : props.recipes.length + 1,
            validation: {
                required: true,
            },
            valid: true,
        },
    };

    const [basics, setBasics] = useState(initialFormState);
    const [ingredients, setIngredients] = useState(
        props.editedRecipe
            ? props.recipes[props.editedRecipe - 1].ingredients
            : {}
    );
    const [ingredientCount, setIngredientCount] = useState(
        props.editedRecipe
            ? props.recipes[props.editedRecipe - 1].ingredientCount
            : 0
    );
    const [steps, setSteps] = useState(
        props.editedRecipe ? props.recipes[props.editedRecipe - 1].steps : {}
    );
    const [stepCount, setStepCount] = useState(
        props.editedRecipe ? props.recipes[props.editedRecipe - 1].stepCount : 0
    );

    const changeBasicData = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(basics[inputIdentifier], {
            value: event.target.value,
        });
        const updatedBasics = updateObject(basics, {
            [inputIdentifier]: updatedFormElement,
        });

        setBasics(updatedBasics);
    };

    const changeIngredientData = (event, identifier, inputName) => {
        const updatedIngredient = updateObject(ingredients[identifier], {
            [inputName]: event.target.value,
        });
        const updatedIngredients = updateObject(ingredients, {
            [identifier]: updatedIngredient,
        });
        setIngredients(updatedIngredients);
    };

    const changeIngredientCount = change => {
        const updatedIngredients = ingredients ? ingredients : [];
        const updatedIngredientCount = ingredientCount + change;
        if (change === 1) {
            updatedIngredients[`ingredient${updatedIngredientCount}`] = {
                name: '',
                type: 'dairy',
                quantity: '',
                unit: '',
            };
        }
        if (change === -1) {
            delete updatedIngredients[`ingredient${ingredientCount}`];
        }
        setIngredients(updatedIngredients);
        setIngredientCount(updatedIngredientCount);
    };

    const changeStepData = (event, identifier) => {
        const updatedSteps = updateObject(
            (steps, { ...steps, [identifier]: event.target.value })
        );
        setSteps(updatedSteps);
    };

    const changeStepCount = change => {
        const updatedSteps = steps ? steps : [];
        const updatedStepCount = stepCount + change;
        if (change === 1) {
            updatedSteps[`step${updatedStepCount}`] = '';
        }
        if (change === -1) {
            delete updatedSteps[`step${stepCount}`];
        }
        setSteps(updatedSteps);
        setStepCount(updatedStepCount);
    };

    const returnToRecipe = event => {
        event.preventDefault();
        props.history.push('/view');
    };

    const submitPrevent = event => {
        event.preventDefault();
    };

    const uploadRecipe = event => {
        event.preventDefault();
        const basics = {};
        for (let identifier in basics) {
            basics[identifier] = basics[identifier].value;
        }

        const recipe = {
            ...basics,
            ingredients: ingredients,
            ingredientCount: ingredientCount,
            steps: steps,
            stepCount: stepCount,
        };
        props.onUploadRecipe(recipe, props.token);
        props.history.push('/');
    };

    const deleteRecipe = event => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            props.onDeleteRecipe(props.editedRecipe, props.token);
            props.history.push('/');
        }
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
    return (
        <div className={styles.RecipeEditorContainer}>
            <form className={styles.RecipeEditor} onSubmit={submitPrevent}>
                <div className={styles.Basics}>
                    <h3>Basics</h3>
                    <div className={styles.BasicsInputs}>{basicsForm}</div>
                </div>
                <div className={styles.Ingredients}>
                    <h3>
                        <span
                            onClick={() => changeIngredientCount(-1)}
                            className={styles.LessButton}
                        >
                            -
                        </span>
                        Ingredients
                        <span
                            onClick={() => changeIngredientCount(1)}
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
                            onClick={() => changeStepCount(-1)}
                            className={styles.LessButton}
                        >
                            -
                        </span>
                        Steps
                        <span
                            onClick={() => changeStepCount(1)}
                            className={styles.MoreButton}
                        >
                            +
                        </span>
                    </h3>
                    <div className={styles.StepsInputs}>{stepsForm}</div>
                </div>
            </form>
            <div className={styles.RecipeEditCTAs}>
                <Button
                    color={props.editedRecipe ? 'red' : 'disabled'}
                    clicked={
                        props.editedRecipe
                            ? event => deleteRecipe(event)
                            : event => event.preventDefault()
                    }
                    type="button"
                    svgName="delete"
                >
                    Delete recipe
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
                    color={props.editedRecipe ? 'blue' : 'disabled'}
                    clicked={
                        props.editedRecipe
                            ? event => returnToRecipe(event)
                            : event => event.preventDefault()
                    }
                    type="button"
                    svgName="return"
                >
                    View recipe
                </Button>
                <Button
                    color="green"
                    clicked={event => uploadRecipe(event)}
                    type="button"
                    svgName="upload"
                >
                    {props.editedRecipe ? 'Confirm edit' : 'Confirm upload'}
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        editedRecipe: state.recipe.editedRecipe,
        recipes: state.recipe.recipes,
        ingredientRows: state.recipe.ingredientRows,
        stepRows: state.recipe.stepRows,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUploadRecipe: (recipe, token) =>
            dispatch(actions.uploadRecipe(recipe, token)),
        onDeleteRecipe: (recipe, token) =>
            dispatch(actions.deleteRecipe(recipe, token)),
        onSetEditedRecipe: index => dispatch(actions.setEditedRecipe(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditor);
