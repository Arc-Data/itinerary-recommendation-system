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
import Accommodation from './pages/Accommodation'
import Activity from './pages/Activity'
import Food from './pages/Food'
import Detail from './pages/Detail'
import AddLocation from './pages/AddLocation'
import CreateTrip from './pages/CreateTrip';
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Destination from './pages/Destination'
/*Components*/
/*Layout*/
import BaseLayout from './layout/BaseLayout';
import CreateTripLayout from './layout/CreateTripLayout';
import Plan from './pages/Plan';
import Preferences from './pages/Preferences';
import AdminRoutes from './utils/AdminRoutes';
import AdminLocationView from './pages/AdminLocationView';
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
				<Route path="/destination" element={<Destination />} />
				<Route path="/accommodation" element={<Accommodation />} />
				<Route path="/food" element={<Food />} />

				<Route path="/preferences" element={<Preferences/>}/>
				<Route element={<PrivateRoutes />} >
					
					<Route element={<BaseLayout />}>
						<Route path="/location/:id" element={<Detail/>}/>
						<Route path="/home" element={<HomePage />} />
						<Route path="/search" element={<SearchPage />} />
					</Route>

					<Route element={<CreateTripLayout/>}>
						<Route path="/create" element={<CreateTrip />} /> 
					</Route>
					<Route path="/plan/:id/" element={<Plan />} />

				</Route>
				<Route path="/admin" element={<AdminRoutes />}>
					<Route path = "/admin/" index element={<Users users={data[0].users}/>} />
					<Route path="/admin/locations" element={<Location locations={data[0].locations}/>} />
					
					<Route path="/admin/location" element={<AddLocation/>} />
					<Route path="/admin/location/:id" element={<AdminLocationView />} />

					<Route path="/admin/accommodation" element={<Accommodation />} />
					<Route path="/admin/activity" element={<Activity />} />
					<Route path="/admin/food" element={<Food />} />
				</Route>
			</Routes>
		</AuthProvider>
		</BrowserRouter>
	)
}

export default App;