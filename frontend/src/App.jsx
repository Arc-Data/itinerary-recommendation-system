import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import data from './data'
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
        <Route path="/" element={<Layout />}>
            <Route index element={<Users users={data[0].users}/>}></Route>
            <Route path="location" element={<Location locations={data[0].locations}/>}></Route>
            <Route path="accommodation" element={<Accommodation />}></Route>
            <Route path="activity" element={<Activity />}></Route>
            <Route path="food" element={<Food />}></Route>
            <Route path="add-location" element={<AddLocation />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
