import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import Layout from './hoc/Layout/Layout';
import RecipeViewer from './containers/RecipeViewer/RecipeViewer';
import RecipeLister from './containers/RecipeLister/RecipeLister';
import RecipeEditor from './containers/RecipeEditor/RecipeEditor';
import * as actions from './store/actions/actionIndex';

const AnimatedSwitch = withRouter(({ location }) => (
    <TransitionGroup component={null}>
        <CSSTransition
            key={location.key}
            classNames="Route"
            timeout={{ enter: 500, exit: 500 }}
        >
            <Switch location={location}>
                <Route path="/" exact component={RecipeLister} />
                <Route path="/view" component={RecipeViewer} />
                <Route path="/edit" component={RecipeEditor} />
                <Redirect to="/" />
            </Switch>
        </CSSTransition>
    </TransitionGroup>
));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
        if (!this.props.fetched) {
            this.props.onFetchRecipes();
        }
    }
    render() {
        return (
            <Layout>
                <AnimatedSwitch />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        fetched: state.recipe.fetched,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchRecipes: () => dispatch(actions.fetchRecipes()),
        onTryAutoSignup: () => dispatch(actions.tryAutoSignup()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
