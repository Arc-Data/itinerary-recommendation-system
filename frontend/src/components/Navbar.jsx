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
						<h1 className='login--text'>LOGIN</h1>
					</button>
					<button className='link--button' onClick={toggleSignModal}>
						<h1 className='sign--text'>SIGN UP</h1>
					</button>
				</div>
			</nav>
			{isLoginOpen && (
				<Modal onClose={toggleLoginModal}>
					<Login onClose={toggleLoginModal}/>
				</Modal>
			)}
			{isSignOpen && (
				<Modal onClose={toggleSignModal}>
					<Signup onClose={toggleSignModal}/>
				</Modal>
			)}
		</>
	);
}