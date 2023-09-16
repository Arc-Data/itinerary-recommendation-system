import { Outlet } from 'react-router-dom'
import Map from '../components/Map'

const CreateTripLayout = () => {
  return (
    <div className='create--layout'>
        <Outlet />
        <Map />
    </div>
  )
}

export default CreateTripLayout