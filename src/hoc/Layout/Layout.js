import styles from './Layout.module.css';
import { createPortal } from 'react-dom';

import Header from '../../components/Globals/Header/Header';
import Footer from '../../components/Globals/Footer/Footer';
import Auth from '../../containers/Auth/Auth';

const Layout = props => {
    console.log('LAYOUT IS RENDERING');
    return (
        <>
            <Header />
            <main className={styles.Content}>{props.children}</main>
            <Footer />
            {createPortal(<Auth />, document.getElementById('auth-root'))}
        </>
    );
};

export default Layout;
