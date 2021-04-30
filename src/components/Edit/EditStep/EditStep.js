import Input from '../../Globals/UI/Input/Input';

const EditStep = props => {
    return (
        <>
            <Input
                name={`step[${props.index}]`}
                elementType="textarea"
                elementConfig={{ placeholder: `Step Description` }}
                changed={event => props.changed(event, props.index)}
                value={props.step}
            />
        </>
    );
};

export default EditStep;
