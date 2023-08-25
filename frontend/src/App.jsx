import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
/*PAGES*/
import data from './data';
import DetailPage from './pages/DetailPage';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import Layout from './components/Layout'
import Users from './pages/Users'
import Location from './pages/Location'
import Accommodation from './pages/Accommodation'
import Activity from './pages/Activity'
import Food from './pages/Food'
import AddLocation from './pages/AddLocation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/detailPage" element={<DetailPage />} />
        
        {/*<Route path="/admin" element={<Layout />}>
            <Route path = "/admin/" index element={<Users users={data[0].users}/>}></Route>
            <Route path="/admin/location" element={<Location locations={data[0].locations}/>}></Route>
            <Route path="/admin/accommodation" element={<Accommodation />}></Route>
            <Route path="/admin/activity" element={<Activity />}></Route>
            <Route path="/admin/food" element={<Food />}></Route>
            <Route path="/admin/add-location" element={<AddLogcation />}></Route>

          </Route>*/}

      </Routes>
    </BrowserRouter>
  )
}

export default App;