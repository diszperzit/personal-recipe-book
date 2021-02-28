import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Auth.module.css';

import Overlay from '../../components/Globals/UI/Overlay/Overlay';
import Input from '../../components/Globals/UI/Input/Input';
import Button from '../../components/Globals/UI/Button/Button';
import Spinner from '../../components/Globals/UI/Spinner/Spinner';

import { updateObject } from '../../helpers/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actionIndex';

class Auth extends Component {
    state = {
        loginForm: {
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
        },
    };

    changeInput = (event, inputName) => {
        const updatedLoginForm = updateObject(this.state.loginForm, {
            [inputName]: updateObject(this.state.loginForm[inputName], {
                value: event.target.value,
            }),
        });
        this.setState({ loginForm: updatedLoginForm });
    };
    tryLogin = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.loginForm.email.value,
            this.state.loginForm.password.value
        );
        const clearedEmail = updateObject(this.state.loginForm.email, {
            value: '',
        });
        const clearedPassword = updateObject(this.state.loginForm.password, {
            value: '',
        });
        const clearedloginForm = updateObject(this.state.loginForm, {
            email: clearedEmail,
            password: clearedPassword,
        });
        this.setState({ loginForm: clearedloginForm });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key],
            });
        }

        let formContents = <Spinner />;
        if (!this.props.authInProgress) {
            const formInputs = formElementsArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.changeInput(event, formElement.id)}
                />
            ));
            formContents = (
                <React.Fragment>
                    {formInputs}
                    <Button color="green" type="submit" svgName="login">
                        Log In
                    </Button>
                </React.Fragment>
            );
        }
        if (this.props.authError) {
            formContents = (
                <p>
                    {[
                        'INVALID_EMAIL',
                        'INVALID_PASSWORD',
                        'MISSING_PASSWORD',
                    ].includes(this.props.authError.message)
                        ? 'Log-in informations incorrect.'
                        : this.props.authError.message}
                </p>
            );
        }
        if (this.props.authenticated) {
            formContents = '';
        }
        let modal = (
            <CSSTransition
                in={this.props.showLoginModal}
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
                    <Overlay clicked={this.props.onToggleLoginModal} />
                    <form className={styles.AuthForm} onSubmit={this.tryLogin}>
                        {formContents}
                        <span
                            className={styles.CloseModal}
                            onClick={this.props.onToggleLoginModal}
                        ></span>
                    </form>
                </div>
            </CSSTransition>
        );

        return <div className={styles.Auth}>{modal}</div>;
    }
}

const mapStateToProps = (state) => {
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

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onToggleLoginModal: () => dispatch(actions.toggleLoginModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
