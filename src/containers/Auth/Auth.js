import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Auth.module.css';

import Overlay from '../../components/Globals/UI/Overlay/Overlay';
import Input from '../../components/Globals/UI/Input/Input';
import Button from '../../components/Globals/UI/Button/Button';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';

import { updateObject } from '../../helpers/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actionIndex';

const Auth = props => {
    const initialFormState = {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address',
            },
            value: '',
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
        },
    };
    const [loginForm, setLoginForm] = useState(initialFormState);

    const changeInput = (event, inputName) => {
        const updatedLoginForm = updateObject(loginForm, {
            [inputName]: updateObject(loginForm[inputName], {
                value: event.target.value,
            }),
        });
        setLoginForm(updatedLoginForm);
    };

    const tryLogin = event => {
        event.preventDefault();
        props.onAuth(loginForm.email.value, loginForm.password.value);
        const clearedEmail = updateObject(loginForm.email, {
            value: '',
        });
        const clearedPassword = updateObject(loginForm.password, {
            value: '',
        });
        const clearedloginForm = updateObject(loginForm, {
            email: clearedEmail,
            password: clearedPassword,
        });
        setLoginForm(clearedloginForm);
    };

    const formElementsArray = [];
    for (let key in loginForm) {
        formElementsArray.push({
            id: key,
            config: loginForm[key],
        });
    }

    let formContents = <Spinner />;
    if (!props.authInProgress) {
        const formInputs = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={event => changeInput(event, formElement.id)}
            />
        ));
        formContents = (
            <>
                {formInputs}
                <Button color="green" type="submit" svgName="login">
                    Log In
                </Button>
            </>
        );
    }
    if (props.authError) {
        formContents = (
            <p>
                {[
                    'INVALID_EMAIL',
                    'INVALID_PASSWORD',
                    'MISSING_PASSWORD',
                ].includes(props.authError.message)
                    ? 'Log-in informations incorrect.'
                    : props.authError.message}
            </p>
        );
    }
    if (props.authenticated) {
        formContents = '';
    }
    let modal = (
        <CSSTransition
            in={props.showLoginModal}
            timeout={500}
            classNames={{
                enterActive: styles.AuthModalEnterActive,
                enterDone: styles.AuthModalEnterDone,
                exitActive: styles.AuthModalExitActive,
                exitDone: styles.AuthModalExitDone,
            }}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.AuthModal}>
                <Overlay clicked={props.onToggleLoginModal} />
                <form className={styles.AuthForm} onSubmit={tryLogin}>
                    {formContents}
                    <span
                        className={styles.CloseModal}
                        onClick={props.onToggleLoginModal}
                    ></span>
                </form>
            </div>
        </CSSTransition>
    );

    return modal;
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        showLoginModal: state.auth.showLoginModal,
        authInProgress: state.auth.authInProgress,
        authenticated: state.auth.authenticated,
        authError: state.auth.authError,
        loginError: state.auth.loginError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onToggleLoginModal: () => dispatch(actions.toggleLoginModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
