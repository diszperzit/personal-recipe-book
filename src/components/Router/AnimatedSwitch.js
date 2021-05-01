import { withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import AppRouter from './AppRouter';

const AnimatedSwitch = withRouter(({ location }) => {
    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.key}
                classNames="Route"
                timeout={{ enter: 500, exit: 500 }}
            >
                <AppRouter />
            </CSSTransition>
        </TransitionGroup>
    );
});

export default AnimatedSwitch;
