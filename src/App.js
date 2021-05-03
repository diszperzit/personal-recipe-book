import React, { useEffect } from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';
import AnimatedSwitch from './components/Router/AnimatedSwitch';

import { useSelector, useDispatch } from 'react-redux';
import { tryAutoLogin } from './store/auth-actions';
import { fetchRecipes } from './store/recipe-actions';

const App = props => {
    const dispatch = useDispatch();
    const authenticated = useSelector(state => state.auth.authenticated);
    const { fetched } = props;

    useEffect(() => {
        dispatch(tryAutoLogin());
        if (!fetched) {
            dispatch(fetchRecipes());
        }
    }, [fetched]);

    return (
        <Layout>
            <AnimatedSwitch authenticated={authenticated} />
        </Layout>
    );
};

export default App;
