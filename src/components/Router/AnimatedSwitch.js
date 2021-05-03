import AppRouter from './AppRouter';
import { withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AnimatedSwitch = withRouter(({ location }) => {
    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.key}
                classNames="Route"
                timeout={{ enter: 200, exit: 200 }}
            >
                <AppRouter location={location} />
            </CSSTransition>
        </TransitionGroup>
    );
});

export default AnimatedSwitch;
