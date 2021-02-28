import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { API_KEY } from '../../helpers/utility';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};
const authSuccess = (idToken, refreshToken, localId, expiresIn) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', localId);

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        refreshToken: refreshToken,
        userId: localId,
    };
};
const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const auth = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                authData
            )
            .then((response) => {
                dispatch(
                    authSuccess(
                        response.data.idToken,
                        response.data.refreshToken,
                        response.data.localId,
                        response.data.expiresIn
                    )
                );
                setTimeout(() => {
                    dispatch(refreshAuthToken());
                }, (response.data.expires_in - 60) * 1000);
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error));
            });
    };
};

const refreshAuthToken = (refreshToken) => {
    return (dispatch) => {
        const authData = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };
        axios
            .post(
                `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
                authData
            )
            .then((response) => {
                dispatch(
                    authSuccess(
                        response.data.id_token,
                        response.data.refresh_token,
                        response.data.user_id,
                        response.data.expires_in
                    )
                );
                setTimeout(() => {
                    dispatch(refreshAuthToken());
                }, (response.data.expires_in - 60) * 1000);
            })
            .catch((error) => {
                // TODO
                console.error(error);
            });
    };
};

export const tryAutoSignup = () => {
    return (dispatch) => {
        const token = localStorage.getItem('idToken');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem('expirationDate')
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(
                    refreshAuthToken(localStorage.getItem('refreshToken'))
                );
            }
        }
    };
};

export const logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('idTorefreshTokenken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const toggleLoginModal = () => {
    return {
        type: actionTypes.TOGGLE_LOGIN_MODAL,
    };
};
