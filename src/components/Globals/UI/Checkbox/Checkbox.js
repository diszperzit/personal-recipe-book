import React from 'react';
import styles from './Checkbox.module.css';

const checkbox = (props) => {
    let classNames = [styles.CheckboxWrapper, styles[props.name]];
    if (props.active) {
        classNames.push(styles.active);
    }
    classNames = classNames.join(' ');
    return (
        <div className={classNames}>
            <label
                htmlFor={props.name}
                className={styles.Label}
                onClick={props.toggled}
            >
                {props.children}
            </label>
        </div>
    );
};

export default checkbox;
