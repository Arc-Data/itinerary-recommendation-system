/*PAGES*/
import Login from './Login.jsx';
import { Link } from 'react-router-dom';


export default function Navbar({isLoginOpen, toggleLoginModal}) {
	return (
		<>
			<nav className='navbar'>
				<Link to="/">
					<img className="cebu--route" src="../images/Untitled design.png" alt="LandingPage" />
				</Link>
				<div className='link'>
					<button className='link--button' onClick={toggleLoginModal}>
						<h1 className='login--text'>LOGIN</h1>
					</button>
					<button className='link--button'>
						<h1 className='sign--text'>SIGN UP</h1>
					</button>
				</div>
			</nav>
			{isLoginOpen && <Login onClose={toggleLoginModal}/>}
		</>
	);
}