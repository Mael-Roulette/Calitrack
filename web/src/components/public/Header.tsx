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
		<header>
			<nav className={`header-nav ${isNavVisible ? "active" : ""}`}>
				<ul>
					{navItems.map((item) => (
						<li key={item.to}>
							<NavLink to={item.to}>{item.label}</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<button
				onClick={toggleNav}
				className={`header-toggle ${isNavVisible ? "opened" : ""}`}
				aria-label='Menu'
			>
				<span className='header-toggle-bars'></span>
				<span className='screen-reader-text'>Menu</span>
			</button>
		</header>
	);
};

export default Header;
