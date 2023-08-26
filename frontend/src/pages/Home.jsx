import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div>This is the home page</div>
  )
}

export default HomePage;