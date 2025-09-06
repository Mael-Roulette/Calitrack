import { BrowserRouter, Routes, Route } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Features from "./pages/public/Features";
import Pricing from "./pages/public/Pricing";
import Contact from "./pages/public/Contact";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<PublicLayout />}>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='features' element={<Features />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='contact' element={<Contact />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
