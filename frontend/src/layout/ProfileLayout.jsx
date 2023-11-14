import { Outlet } from 'react-router-dom'
import UserNav from '../components/UserNav'

const ProfileLayout = () => {
  return (
    <div>
        <UserNav />
        <div className='profile--container'>
            <div className='profile--sidebar'>
                Supposedly the sidebar of sorts
            </div>
            <Outlet />
        </div>
    </div>
  )
}

export default ProfileLayout