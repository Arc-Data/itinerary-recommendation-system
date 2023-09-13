import React, { useContext, useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import searchIcon from '/images/search.png'
import userIcon from '/images/user.png'
import AuthContext from '../context/AuthContext';
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