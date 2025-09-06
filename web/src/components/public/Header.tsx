import { NavLink } from "react-router";
import { useState } from "react";

const Header = () => {
	const navItems = [
		{ to: "/", label: "Accueil" },
		{ to: "/about", label: "À propos" },
		{ to: "/features", label: "Fonctionnalités" },
		{ to: "/pricing", label: "Tarifs" },
		{ to: "/contact", label: "Contact" },
	];

	const [isNavVisible, setIsNavVisible] = useState(false);

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};

	return (
		<header className='header'>
			<div className='header__logo'>
				<NavLink to='/'>
					<img src='/logo.png' alt='Calitrack' />
				</NavLink>
			</div>

			<nav
				className={`header__nav ${isNavVisible ? "header__nav--active" : ""}`}
			>
				<ul className='header__nav-list'>
					{navItems.map((item) => (
						<li key={item.to} className='header__nav-item'>
							<NavLink
								to={item.to}
								className={({ isActive }) =>
									`header__nav-link ${isActive ? "header__nav-link--active" : ""}`
								}
								onClick={() => setIsNavVisible(false)}
							>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<div className='header__buttons'>
				<NavLink to='/contact' className="button-primary">Contact</NavLink>
			</div>

			{/* Menu burger (mobile uniquement) */}
			<button
				onClick={toggleNav}
				className={`header__burger ${isNavVisible ? "header__burger--opened" : ""}`}
				aria-label='Menu'
				aria-expanded={isNavVisible}
			>
				<span className='header__burger-line'></span>
				<span className='header__burger-line'></span>
				<span className='header__burger-line'></span>
				<span className='screen-reader-text'>Menu</span>
			</button>
		</header>
	);
};

export default Header;
