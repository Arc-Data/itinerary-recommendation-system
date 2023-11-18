import { Link } from "react-router-dom"

const CreateNav = () => {
  return (
    <div className="create--nav-bar">
        <Link to="/">
            <img className="cebu--route" src="/images/logo.png" alt="LandingPage" />
        </Link>
    </div>
  )
}

export default CreateNav