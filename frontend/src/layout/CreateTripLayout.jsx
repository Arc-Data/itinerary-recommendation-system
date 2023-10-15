import { Outlet } from 'react-router-dom'
import Map from '../components/Map'
import CreateNav from '../components/CreateNav'

const CreateTripLayout = () => {
  return (
    <>
      <div className="create--layout">
          <div>
            <CreateNav />
            <Outlet />
          </div>
          <Map />
      </div>
    </>
  )
}

export default CreateTripLayout