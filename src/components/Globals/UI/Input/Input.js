import styles from './Input.module.css';

const Input = props => {
    let inputElement = '';
    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    name={props.name}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    name={props.name}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    name={props.name}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        );
                    })}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
