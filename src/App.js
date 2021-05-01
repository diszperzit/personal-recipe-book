import React, { useEffect } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import Layout from './hoc/Layout/Layout';
import Spinner from './components/Globals/UI/Spinner/Spinner';
import * as actions from './store/actions/actionIndex';

const RecipeLister = React.lazy(() =>
    import('./containers/RecipeLister/RecipeLister')
);
const RecipeViewer = React.lazy(() =>
    import('./containers/RecipeViewer/RecipeViewer')
);
const RecipeEditor = React.lazy(() =>
    import('./containers/RecipeEditor/RecipeEditor')
);

const AnimatedSwitch = withRouter(({ location }) => (
    <TransitionGroup component={null}>
        <CSSTransition
            key={location.key}
            classNames="Route"
            timeout={{ enter: 500, exit: 500 }}
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
                    <Route
                        path="/edit/:id"
                        render={props => (
                            <RecipeEditor {...props} isEditing={true} />
                        )}
                    />
                    <Route
                        path="/upload"
                        render={props => (
                            <RecipeEditor {...props} isEditing={false} />
                        )}
                    />
                    <Redirect to="/" />
                </Switch>
            </React.Suspense>
        </CSSTransition>
    </TransitionGroup>
));

const App = props => {
    console.log('APP IS RENDERING');
    const { fetched } = props;
    useEffect(() => {
        props.onTryAutoSignup();
        if (!fetched) {
            props.onFetchRecipes();
        }
    }, [fetched]);

    return (
        <Layout>
            <AnimatedSwitch />
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
        fetched: state.recipe.fetched,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipes: () => dispatch(actions.fetchRecipes()),
        onTryAutoSignup: () => dispatch(actions.tryAutoSignup()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
