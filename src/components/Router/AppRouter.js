import React from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../Globals/UI/Spinner/Spinner';

const RecipeLister = React.lazy(() =>
    import('../../containers/RecipeLister/RecipeLister')
);
const RecipeViewer = React.lazy(() =>
    import('../../containers/RecipeViewer/RecipeViewer')
);
const RecipeEditor = React.lazy(() =>
    import('../../containers/RecipeEditor/RecipeEditor')
);

const AppRouter = props => {
    return (
        <React.Suspense fallback={<Spinner />}>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={props => <RecipeLister {...props} />}
                />
                <Route
                    path="/view/:id"
                    render={props => <RecipeViewer {...props} />}
                />
                {props.authenticated && (
                    <Route
                        path="/edit/:id"
                        render={props => (
                            <RecipeEditor {...props} isEditing={true} />
                        )}
                    />
                )}
                {props.authenticated && (
                    <Route
                        path="/upload"
                        render={props => (
                            <RecipeEditor {...props} isEditing={false} />
                        )}
                    />
                )}
                <Redirect to="/" />
            </Switch>
        </React.Suspense>
    );
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
    };
};

export default connect(mapStateToProps, null)(AppRouter);
