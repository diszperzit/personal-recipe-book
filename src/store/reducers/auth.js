import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helpers/utility';

const initialState = {
    token: false,
    userId: false,
    showLoginModal: false,
    authInProgress: false,
    authenticated: false,
    authError: false,
};

const authStart = (state) => {
    return updateObject(state, {
        authInProgress: true,
        authError: false,
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        refresh: action.refreshToken,
        userId: action.userId,
        authError: false,
        authInProgress: false,
        authenticated: true,
        showLoginModal: false,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        authError: action.error,
        authInProgress: false,
    });
};

const authLogout = (state) => {
    return updateObject(state, {
        token: false,
        userId: false,
        authenticated: false,
    });
};

const toggleLoginModal = (state) => {
    return updateObject(state, {
        showLoginModal: !state.showLoginModal,
        authError: false,
        authInProgress: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.TOGGLE_LOGIN_MODAL:
            return toggleLoginModal(state, action);
        default:
            return state;
    }
};

export default reducer;
