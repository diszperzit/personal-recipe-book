import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    const authenticated = useSelector(state => state.auth.authenticated);
    return (
        <React.Suspense fallback={<Spinner />}>
            <Switch location={props.location}>
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
                            <RecipeEditor {...props} isEditing={false} />
                        )}
                    />
                )}
                <Redirect to="/" />
            </Switch>
        </React.Suspense>
    );
};

export default AppRouter;
