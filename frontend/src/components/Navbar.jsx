import { Link } from 'react-router-dom';
/*PAGES*/
import Modal from './Modal.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default function Navbar({isLoginOpen, toggleLoginModal, isSignOpen, toggleSignModal}) {
	return (
		<>
			<nav className='navbar'>
				<Link to="/">
					<img className="cebu--route" src="../images/Untitled design.png" alt="LandingPage" />
				</Link>
				<div className='link'>
					<button className='link--button' onClick={toggleLoginModal}>
						LOGIN
					</button>
					<button className='link--button' onClick={toggleSignModal}>
						SIGN UP
					</button>
				</div>
			</nav>
			{isLoginOpen && (
				<Modal onClose={toggleLoginModal}>
					<Login/>
				</Modal>
			)}
			{isSignOpen && (
				<Modal onClose={toggleSignModal}>
					<Signup/>
				</Modal>
			)}
		</>
	);
}