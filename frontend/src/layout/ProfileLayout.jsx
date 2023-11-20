import { Link, Outlet } from 'react-router-dom'
import UserNav from '../components/UserNav'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import AccordionHeader from '../pages/AccordionHeader'
import { faBookmark, faBusinessTime, faDirections } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProfileLayout = () => {
	const { user } = useContext(AuthContext)
	const [openTrips, setOpenTrips] = useState(true)
	
	const toggleTrips = () => {
		setOpenTrips(prev => !prev)
	}
	
	return (
		<div>
			<UserNav />
			<div className='profile--container'>
				<div className='profile--sidebar'>
					<div className='profile--section'>
						<p className='profile--icon'>{user.email[0].toUpperCase()}</p>
						<p className="profile--name">{user.full_name}</p>
						<p className="profile--email">{user.email}</p>
					</div>
					<div className='profile--links-section'>
						<div className="profile--trips-section">
								<AccordionHeader 
									active={openTrips}
									handleClick={toggleTrips}
									icon={faDirections}
									text={"Your Trips"}/>
							{openTrips &&
							<div className='accordion-content accordion-underline'>
								<div>
									<p></p>
									<Link to="trips">
									Itineraries
									</Link>
								</div>
								<div>
									<p></p>
									<Link to ="rate">
									Recent
									</Link>
								</div>
							</div>
							}
						</div>
						<Link to = "business">
							<div className='profile--link'>
								<img src="/business.svg" alt="" />
								<p>Business</p>
							</div>
						</Link>
						<div className="profile--link">
							<FontAwesomeIcon icon={faBookmark} />
							<p>Bookmarks</p>
						</div>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	)
}

export default ProfileLayout