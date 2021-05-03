import Button from './Button/Button';
import styles from './ButtonList.module.css';

const ButtonList = props => {
    const buttons = props.config?.map(button => (
        <Button
            key={button.label}
            type={button.type}
            color={button.color}
            clicked={button.clicked}
            svgName={button.svgName}
            label={button.label}
            show={button.show}
        ></Button>
    ));

    return <div className={styles.ButtonList}>{buttons}</div>;
};

export default ButtonList;
