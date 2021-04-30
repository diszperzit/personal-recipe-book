import styles from './EditIngredient.module.css';
import Input from '../../Globals/UI/Input/Input';

const EditIngredient = props => {
    return (
        <div className={styles.EditIngredient}>
            <Input
                name={`ingredient[${props.index}][name]`}
                elementType="input"
                elementConfig={{ placeholder: 'NAME' }}
                changed={event => props.changed(event, props.index, 'name')}
                value={props.ingredient.name}
                mode="full"
            />
            <Input
                name={`ingredient[${props.index}][type]`}
                elementType="select"
                elementConfig={{
                    options: [
                        { value: 'dairy', displayValue: 'Dairy' },
                        { value: 'fruit', displayValue: 'Fruit' },
                        { value: 'grain', displayValue: 'Grain' },
                        { value: 'meat', displayValue: 'Meat' },
                        { value: 'oil', displayValue: 'Oil' },
                        { value: 'spice', displayValue: 'Spice' },
                        { value: 'vegetable', displayValue: 'Vegetable' },
                    ],
                }}
                changed={event => props.changed(event, props.index, 'type')}
                value={props.ingredient.type}
                mode="full"
            />
            <Input
                name={`ingredient[${props.index}][quantity]`}
                elementType="input"
                elementConfig={{ placeholder: 'QY' }}
                changed={event => props.changed(event, props.index, 'quantity')}
                value={props.ingredient.quantity}
                mode="full"
            />
            <Input
                name={`ingredient[${props.index}][unit]`}
                elementType="input"
                elementConfig={{ placeholder: 'UNIT' }}
                changed={event => props.changed(event, props.index, 'unit')}
                value={props.ingredient.unit}
                mode="full"
            />
        </div>
    );
};

export default EditIngredient;
