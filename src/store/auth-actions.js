import axios from '../axios';
import { API_KEY } from '../helpers/utility';
import { authActions } from './auth-slice';

const authConfig = (idToken, refreshToken, localId, expiresIn) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', localId);

    return {
        token: idToken,
        refresh: refreshToken,
        userID: localId,
    };
};

const refreshAuthToken = refreshToken => {
    return dispatch => {
        const authData = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };
        dispatch(authActions.start());
        axios
            .post(
                `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
                authData
            )
            .then(authResponse => {
                const loginData = authConfig(
                    authResponse.data.id_token,
                    authResponse.data.refresh_token,
                    authResponse.data.user_id,
                    authResponse.data.expires_in
                );
                dispatch(authActions.success({ ...loginData }));
                setTimeout(() => {
                    refreshAuthToken(loginData.refresh);
                }, (authResponse.data.expires_in - 60) * 1000);
            })
            .catch(error => {
                dispatch(authActions.fail(error));
            });
    };
};

export const login = (email, password) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        dispatch(authActions.start());
        axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                authData
            )
            .then(authResponse => {
                const loginData = authConfig(
                    authResponse.data.idToken,
                    authResponse.data.refreshToken,
                    authResponse.data.localId,
                    authResponse.data.expiresIn
                );
                dispatch(authActions.success({ ...loginData }));
                setTimeout(() => {
                    refreshAuthToken(loginData.refresh);
                }, (authResponse.data.expires_in - 60) * 1000);
            })
            .catch(error => {
                dispatch(authActions.fail(error));
            });
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        dispatch(authActions.logout());
    };
};

export const tryAutoLogin = () => {
    return dispatch => {
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
