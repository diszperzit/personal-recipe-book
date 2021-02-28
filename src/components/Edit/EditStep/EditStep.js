import React from 'react';
import Input from '../../Globals/UI/Input/Input';

const editStep = (props) => {
    return (
        <React.Fragment>
            <Input
                name={`step[${props.index}]`}
                elementType="textarea"
                elementConfig={{ placeholder: `Step Description` }}
                changed={(event) => props.changed(event, props.index)}
                value={props.step}
            />
        </React.Fragment>
    );
};

export default editStep;
