import styles from './Layout.module.css';

import Header from '../../components/Globals/Header/Header';
import Footer from '../../components/Globals/Footer/Footer';
import Auth from '../../containers/Auth/Auth';

const Layout = props => (
    <>
        <Header />
        <main className={styles.Content}>{props.children}</main>
        <Footer />
        <Auth />
    </>
);

export default Layout;
