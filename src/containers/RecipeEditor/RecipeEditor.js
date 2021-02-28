import React, { Component } from 'react';
import styles from './RecipeEditor.module.css';

import Input from '../../components/Globals/UI/Input/Input';
import Button from '../../components/Globals/UI/Button/Button';
import EditIngredient from '../../components/Edit/EditIngredient/EditIngredient';
import EditStep from '../../components/Edit/EditStep/EditStep';

import { updateObject } from '../../helpers/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actionIndex';

class RecipeEditor extends Component {
    state = {
        basics: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Fitness Chicken',
                },
                label: 'Recipe Name (4-30 characters)',
                value: this.props.editedRecipe
                    ? this.props.recipes[this.props.editedRecipe - 1].name
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
                value: this.props.editedRecipe
                    ? this.props.recipes[this.props.editedRecipe - 1].category
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
                value: this.props.editedRecipe
                    ? this.props.recipes[this.props.editedRecipe - 1].time
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
                value: this.props.editedRecipe
                    ? this.props.recipes[this.props.editedRecipe - 1].difficulty
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
                value: this.props.editedRecipe
                    ? this.props.recipes[this.props.editedRecipe - 1].imageMain
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
                value: this.props.editedRecipe
                    ? this.props.recipes[this.props.editedRecipe - 1]
                          .imageSecondary
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
                value: this.props.editedRecipe
                    ? this.props.recipes[this.props.editedRecipe - 1]
                          .imageThumbnail
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
                value: this.props.editedRecipe
                    ? this.props.editedRecipe
                    : this.props.recipes.length + 1,
                validation: {
                    required: true,
                },
                valid: true,
            },
        },
        ingredients: this.props.editedRecipe
            ? this.props.recipes[this.props.editedRecipe - 1].ingredients
            : {},
        ingredientCount: this.props.editedRecipe
            ? this.props.recipes[this.props.editedRecipe - 1].ingredientCount
            : 0,
        steps: this.props.editedRecipe
            ? this.props.recipes[this.props.editedRecipe - 1].steps
            : {},
        stepCount: this.props.editedRecipe
            ? this.props.recipes[this.props.editedRecipe - 1].stepCount
            : 0,
    };

    changeBasicData = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(
            this.state.basics[inputIdentifier],
            {
                value: event.target.value,
            }
        );
        const updatedBasics = updateObject(this.state.basics, {
            [inputIdentifier]: updatedFormElement,
        });

        this.setState({
            basics: updatedBasics,
        });
    };

    changeIngredientData = (event, identifier, inputName) => {
        const updatedIngredient = updateObject(
            this.state.ingredients[identifier],
            {
                [inputName]: event.target.value,
            }
        );
        const updatedIngredients = updateObject(this.state.ingredients, {
            [identifier]: updatedIngredient,
        });
        this.setState({
            ingredients: updatedIngredients,
        });
    };
    changeIngredientCount = (change) => {
        const updatedIngredients = this.state.ingredients
            ? this.state.ingredients
            : [];
        const updatedIngredientCount = this.state.ingredientCount + change;
        if (change === 1) {
            updatedIngredients[`ingredient${updatedIngredientCount}`] = {
                name: '',
                type: 'dairy',
                quantity: '',
                unit: '',
            };
        }
        if (change === -1) {
            delete updatedIngredients[
                `ingredient${this.state.ingredientCount}`
            ];
        }
        this.setState({
            ingredients: updatedIngredients,
            ingredientCount: updatedIngredientCount,
        });
    };

    changeStepData = (event, identifier) => {
        const updatedSteps = updateObject(
            (this.state.steps,
            { ...this.state.steps, [identifier]: event.target.value })
        );
        this.setState({
            steps: updatedSteps,
        });
    };
    changeStepCount = (change) => {
        const updatedSteps = this.state.steps ? this.state.steps : [];
        const updatedStepCount = this.state.stepCount + change;
        if (change === 1) {
            updatedSteps[`step${updatedStepCount}`] = '';
        }
        if (change === -1) {
            delete updatedSteps[`step${this.state.stepCount}`];
        }
        this.setState({
            steps: updatedSteps,
            stepCount: updatedStepCount,
        });
    };

    returnToRecipe = (event) => {
        event.preventDefault();
        this.props.history.push('/view');
    };

    submitPrevent = (event) => {
        event.preventDefault();
    };
    uploadRecipe = (event) => {
        event.preventDefault();
        const basics = {};
        for (let identifier in this.state.basics) {
            basics[identifier] = this.state.basics[identifier].value;
        }

        const recipe = {
            ...basics,
            ingredients: this.state.ingredients,
            ingredientCount: this.state.ingredientCount,
            steps: this.state.steps,
            stepCount: this.state.stepCount,
        };
        this.props.onUploadRecipe(recipe, this.props.token);
        this.props.history.push('/');
    };
    deleteRecipe = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            this.props.onDeleteRecipe(
                this.props.editedRecipe,
                this.props.token
            );
            this.props.history.push('/');
        }
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.basics) {
            formElementsArray.push({
                id: key,
                config: this.state.basics[key],
            });
        }
        const basicsForm = formElementsArray.map((formElement) => (
            <Input
                key={formElement.id}
                name={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                label={formElement.config.label}
                value={formElement.config.value}
                changed={(event) => this.changeBasicData(event, formElement.id)}
            />
        ));
        let ingredientsForm = [];
        if (this.state.ingredients) {
            for (const [identifier, ingredient] of Object.entries(
                this.state.ingredients
            )) {
                ingredientsForm.push(
                    <EditIngredient
                        key={identifier}
                        index={identifier}
                        changed={(event, identifier, inputName) =>
                            this.changeIngredientData(
                                event,
                                identifier,
                                inputName
                            )
                        }
                        ingredient={ingredient}
                    ></EditIngredient>
                );
            }
        }

        let stepsForm = [];
        if (this.state.steps) {
            for (const [identifier, step] of Object.entries(this.state.steps)) {
                stepsForm.push(
                    <EditStep
                        key={identifier}
                        index={identifier}
                        changed={(event, identifier) =>
                            this.changeStepData(event, identifier)
                        }
                        step={step}
                    ></EditStep>
                );
            }
        }

        return (
            <div className={styles.RecipeEditorContainer}>
                <form
                    className={styles.RecipeEditor}
                    onSubmit={this.submitPrevent}
                >
                    <div className={styles.Basics}>
                        <h3>Basics</h3>
                        <div className={styles.BasicsInputs}>{basicsForm}</div>
                    </div>
                    <div className={styles.Ingredients}>
                        <h3>
                            <span
                                onClick={() => this.changeIngredientCount(-1)}
                                className={styles.LessButton}
                            >
                                -
                            </span>
                            Ingredients
                            <span
                                onClick={() => this.changeIngredientCount(1)}
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
                                onClick={() => this.changeStepCount(-1)}
                                className={styles.LessButton}
                            >
                                -
                            </span>
                            Steps
                            <span
                                onClick={() => this.changeStepCount(1)}
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
                        color="orange"
                        clicked={() => this.props.history.push('/')}
                        type="button"
                        svgName="list"
                    >
                        Back to list
                    </Button>
                    <Button
                        color={this.props.editedRecipe ? 'blue' : 'disabled'}
                        clicked={
                            this.props.editedRecipe
                                ? (event) => this.returnToRecipe(event)
                                : (event) => event.preventDefault()
                        }
                        type="button"
                        svgName="return"
                    >
                        View recipe
                    </Button>
                    <Button
                        color={this.props.editedRecipe ? 'red' : 'disabled'}
                        clicked={
                            this.props.editedRecipe
                                ? (event) => this.deleteRecipe(event)
                                : (event) => event.preventDefault()
                        }
                        type="button"
                        svgName="delete"
                    >
                        Delete recipe
                    </Button>
                    <Button
                        color="green"
                        clicked={(event) => this.uploadRecipe(event)}
                        type="button"
                        svgName="upload"
                    >
                        {this.props.editedRecipe
                            ? 'Confirm edit'
                            : 'Confirm upload'}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editedRecipe: state.recipe.editedRecipe,
        recipes: state.recipe.recipes,
        ingredientRows: state.recipe.ingredientRows,
        stepRows: state.recipe.stepRows,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadRecipe: (recipe, token) =>
            dispatch(actions.uploadRecipe(recipe, token)),
        onDeleteRecipe: (recipe, token) =>
            dispatch(actions.deleteRecipe(recipe, token)),
        onSetEditedRecipe: (index) => dispatch(actions.setEditedRecipe(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditor);
