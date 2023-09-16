import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import UserNav from '../components/UserNav';

const UserLayout = () => {
    return (
        <>
        <UserNav />
        <Outlet />
		<Footer />
        </>
    );
}

export default UserLayout