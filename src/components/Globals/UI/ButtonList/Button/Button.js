import styles from './Button.module.css';
import sprite from '../../../../../assets/images/gastronomy-icons.svg';

const Button = props => {
    const classNames = [styles.Button, styles[props.color]];
    if (props.show === 'mobile') {
        classNames.push(styles.MobileOnly);
    }
    return (
        <button
            type={props.type}
            className={classNames.join(' ')}
            onClick={props.clicked}
        >
            <svg className={styles.ButtonSvg}>
                <use xlinkHref={`${sprite}#icon-cta-${props.svgName}`} />
            </svg>
            <span className={styles.ButtonText}>{props.label}</span>
        </button>
    );
};

export default Button;
