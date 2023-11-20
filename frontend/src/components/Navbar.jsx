import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav className='navbar'>
			<Link to="/">
				<img className="cebu--route" src="/images/logocebu.png" alt="LandingPage" />
			</Link>
			<div className='link'>
			<Link to="login">
				<button className='link--button'>
					LOGIN
				</button>
			</Link>
			<Link to="signup">
				<button className='link--button'>
					SIGNUP
				</button>
			</Link>
			</div>
		</nav>
	)
}