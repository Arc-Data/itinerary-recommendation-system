import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
/*PAGES*/
import data from './data';
import DetailPage from './pages/DetailPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/Home';
import PrivateRoutes from './utils/PrivateRoutes'
import SearchPage from './pages/SearchPage';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout'
import Users from './pages/Users'
import Location from './pages/Location'
import Accommodation from './pages/Accommodation'
import Activity from './pages/Activity'
import Food from './pages/Food'
import AddLocation from './pages/AddLocation'
import UserLayout from './layout/UserLayout';
import CreateTrip from './pages/CreateTrip';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<PrivateRoutes />} >
 
              <Route element={<UserLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/create" element={<CreateTrip />} /> 
                <Route path="/search" element={<SearchPage />} />
                <Route path="/detailPage" element={<DetailPage />} />
              </Route> 
 
              <Route path="/admin" element={<Layout />}>
                <Route path = "/admin/" index element={<Users users={data[0].users}/>} />
                <Route path="/admin/location" element={<Location locations={data[0].locations}/>} />
                <Route path="/admin/accommodation" element={<Accommodation />} />
                <Route path="/admin/activity" element={<Activity />} />
                <Route path="/admin/food" element={<Food />} />
                <Route path="/admin/add-location" element={<AddLocation />} />
              </Route>
 
            </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;