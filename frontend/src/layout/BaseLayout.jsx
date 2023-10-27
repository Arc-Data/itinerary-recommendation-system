import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import UserNav from '../components/UserNav';

const BaseLayout = () => {
    return (
        <>
        <UserNav />
        <Outlet />
		<Footer />
        </>
    );
}

export default BaseLayout