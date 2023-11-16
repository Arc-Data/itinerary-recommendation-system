import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
/*Pages*/
import data from './data';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/Home';
import PrivateRoutes from './utils/PrivateRoutes'
import SearchPage from './pages/SearchPage';
import Users from './pages/Users'
import Location from './pages/Location'
import Detail from './pages/Detail'
import AddLocation from './pages/AddLocation'
import CreateTrip from './pages/CreateTrip';
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
/*Components*/
/*Layout*/
import BaseLayout from './layout/BaseLayout';
import CreateTripLayout from './layout/CreateTripLayout';
import Plan from './pages/Plan';
import Preferences from './pages/Preferences';
import AdminRoutes from './utils/AdminRoutes';
import AdminLocationView from './pages/AdminLocationView';
import ProfileLayout from './layout/ProfileLayout';
import Profile from './pages/Profile';
import Trips from './pages/Trips';
import Rate from './pages/Rate';
import RateDay from './pages/RateDay';
	/*css*/
	
function App() {
	return (
		<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/forgotpass" element={<ForgotPassword />} />

				<Route path="/preferences" element={<Preferences/>}/>
				<Route element={<PrivateRoutes />} >
					
					<Route element={<BaseLayout />}>
						<Route path="/location/:id" element={<Detail/>}/>
						<Route path="/home" element={<HomePage />} />
						<Route path="/search" element={<SearchPage />} />
					</Route>

					<Route path="/profile" element={<ProfileLayout/>}>
						<Route path="/profile/" element={<Profile />} />
						<Route path="/profile/trips" element={<Trips/>} />
						<Route path="/profile/rate" element={<Rate/>} />
						<Route path="/profile/rate/:id" element={<RateDay />} />
					</Route>

					<Route element={<CreateTripLayout/>}>
						<Route path="/create" element={<CreateTrip />} /> 
					</Route>
					<Route path="/plan/:id/" element={<Plan />} />

				</Route>
				<Route path="/admin" element={<AdminRoutes />}>
					<Route path = "/admin/" index element={<Users users={data[0].users}/>} />
					<Route path="/admin/location" element={<AddLocation/>} />
					<Route path="/admin/locations" element={<Location/>} />
					<Route path="/admin/location/:id" element={<AdminLocationView />} />
				</Route>
			</Routes>
		</AuthProvider>
		</BrowserRouter>
	)
}

export default App;