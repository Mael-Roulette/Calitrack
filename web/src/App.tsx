import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./pages/public/index";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Index />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
