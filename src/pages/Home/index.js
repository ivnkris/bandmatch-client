import "./Home.css";
import Button from "../../components/Button/index";

const redirectToPage = (event) => {
	const page = event.currentTarget.id;

	window.location.replace(`/${page}`);
};

console.log("home")

const Home = (props) => {
	return (
		<div className="home-container">
			<div className="home-buttons-container">
				<Button
					label="ASSEMBLE"
					size="large"
					mode="secondary"
					onClick={redirectToPage}
					buttonId="assemble"
				/>
				<Button
					label="COLLAB"
					size="large"
					mode="secondary"
					onClick={redirectToPage}
					buttonId="collab"
				/>
				<Button
					label="GIG"
					size="large"
					mode="secondary"
					onClick={redirectToPage}
					buttonId="gig"
				/>
			</div>
		</div>
	);
};

export default Home;
