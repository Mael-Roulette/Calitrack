import { NavLink } from "react-router";
import FeatureCard from "../../components/public/FeatureCard";
import goalsIcon from "../../assets/icons/public/goals.png";
import calendarIcon from "../../assets/icons/public/calendar.png";
import trackIcon from "../../assets/icons/public/track.png";

const Home = () => {
	const features = [
		{
			image: goalsIcon,
			title: "Objectifs personnalisés",
			text: "Fixe-toi tes objectifs et progresse à ton rythme",
		},
		{
			image: calendarIcon,
			title: "Entrainement personnalisés",
			text: "Crée tes entraînements et planifie ta semaine comme un grand athlète",
		},
		{
			image: trackIcon,
			title: "Suivie de progression",
			text: "Visualise tes progrès simplement grâce à des graphiques clairs",
		},
	];

	return (
		<>
			<section className='home-banner'>
				<h1 className='home-banner_title'>
					Tes objectifs, ta discipline<br></br>Ton app, <span>Calitrack</span>
				</h1>
				<p className='home-banner_subtitle'>
					Suis tes progrès, planifie tes séances et avance pas à pas vers tes
					objectifs en calisthenie.
				</p>
				<div className='home-banner_buttons'>
					<NavLink to='/contact' className='button-secondary btn-first'>
						Voir la bêta
					</NavLink>
					<NavLink to='/features' className='button-primary btn-second'>
						En savoir plus
					</NavLink>
				</div>
			</section>

			<section className='home-features'>
				<h2 className='home-features_title'>
					Tout ce dont tu as besoin pour <span>progresser</span>
				</h2>
				<div className='home-features_items'>
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							image={feature.image}
							title={feature.title}
							text={feature.text}
						/>
					))}
				</div>
				<NavLink to='/features' className='button-tertiary'>
					Voir toutes les fonctionnalités
				</NavLink>
			</section>

			<section className='home-faq'>
				<div className='home-faq-content'>
					<h2 className='home-faq-title'>Des questions ?</h2>
					<p className='home-faq-text'>
						On a regroupé ici les questions les plus courantes. Mais si tu as
						encore un doute, n'hésite pas à nous contacter !
					</p>
				</div>
			</section>
		</>
	);
};

export default Home;
