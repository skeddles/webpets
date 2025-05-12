import { createBrowserRouter } from "react-router";

import LayoutApp from "../layouts/LayoutApp";
import Home from '../pages/Home';


export const router = createBrowserRouter([
	{ Component: LayoutApp, children: [
		{ path: "/", element: <Home/>},
	]},
]);