const FeatureCard = ({
	image,
	title,
	text,
}: {
	image: string;
	title: string;
	text: string;
}) => {
	return (
		<div className='feature-card'>
			<div className='feature-card_image'>
				<img src={image} alt={title} />
			</div>
			<h3 className='feature-card_title'>{title}</h3>
			<p className='feature-card_text'>{text}</p>
		</div>
	);
};

export default FeatureCard;
