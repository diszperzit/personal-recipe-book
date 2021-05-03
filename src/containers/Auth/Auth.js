import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Auth.module.css';

import Overlay from '../../components/Globals/UI/Overlay/Overlay';
import Input from '../../components/Globals/UI/Input/Input';
import Button from '../../components/Globals/UI/Button/Button';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';

import { updateObject } from '../../helpers/utility';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { login } from '../../store/auth-actions';

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

    const dispatch = useDispatch();
    const authInProgress = useSelector(state => state.auth.authInProgress);
    const authError = useSelector(state => state.auth.authError);
    const authenticated = useSelector(state => state.auth.authenticated);
    const showAuthModal = useSelector(state => state.auth.showModal);

    const toggleAuthModal = () => {
        dispatch(authActions.toggleModal());
    };

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
        dispatch(login(loginForm.email.value, loginForm.password.value));
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
    if (!authInProgress) {
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
    if (authError) {
        formContents = (
            <p>
                {[
                    'INVALID_EMAIL',
                    'INVALID_PASSWORD',
                    'MISSING_PASSWORD',
                ].includes(authError.message)
                    ? 'Log-in informations incorrect.'
                    : authError.message}
            </p>
        );
    }
    if (authenticated) {
        formContents = '';
    }
    let modal = (
        <CSSTransition
            in={showAuthModal}
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
                <Overlay clicked={toggleAuthModal} />
                <form className={styles.AuthForm} onSubmit={tryLogin}>
                    {formContents}
                    <span
                        className={styles.CloseModal}
                        onClick={toggleAuthModal}
                    ></span>
                </form>
            </div>
        </CSSTransition>
    );

    return modal;
};

export default Auth;
