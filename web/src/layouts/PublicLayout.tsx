import { Outlet } from "react-router";
import Header from "../components/public/Header";

export default function PublicLayout() {
	return (
		<div className='public-layout'>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
