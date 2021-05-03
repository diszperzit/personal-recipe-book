import React, { useEffect } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import Layout from './hoc/Layout/Layout';
import Spinner from './components/Globals/UI/Spinner/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import { tryAutoLogin } from './store/auth-actions';
import { fetchRecipes } from './store/recipe-actions';

const RecipeLister = React.lazy(() =>
    import('./containers/RecipeLister/RecipeLister')
);
const RecipeViewer = React.lazy(() =>
    import('./containers/RecipeViewer/RecipeViewer')
);
const RecipeEditor = React.lazy(() =>
    import('./containers/RecipeEditor/RecipeEditor')
);

const AnimatedSwitch = withRouter(({ location }) => {
    const authenticated = useSelector(state => state.auth.authenticated);
    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.key}
                classNames="Route"
                timeout={{ enter: 200, exit: 200 }}
            >
                <React.Suspense fallback={<Spinner />}>
                    <Switch location={location}>
                        <Route
                            path="/"
                            exact
                            render={props => <RecipeLister {...props} />}
                        />
                        <Route
                            path="/view/:id"
                            render={props => <RecipeViewer {...props} />}
                        />
                        {authenticated && (
                            <Route
                                path="/edit/:id"
                                render={props => (
                                    <RecipeEditor {...props} isEditing={true} />
                                )}
                            />
                        )}
                        {authenticated && (
                            <Route
                                path="/upload"
                                render={props => (
                                    <RecipeEditor
                                        {...props}
                                        isEditing={false}
                                    />
                                )}
                            />
                        )}
                        <Redirect to="/" />
                    </Switch>
                </React.Suspense>
            </CSSTransition>
        </TransitionGroup>
    );
});

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
