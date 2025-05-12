import { createBrowserRouter } from "react-router";

import LayoutApp from "../layouts/LayoutApp";
import Home from '../pages/Home';
import Items from "../pages/Items";
import { executeApiRequest } from "../util/apiUtils";

export const router = createBrowserRouter([
	{
		Component: LayoutApp,
		children: [
			{ path: "/", element: <Home /> },
			{
				path: "/items",
				element: <Items />,
				loader: async () => await executeApiRequest('item/get-all')
			},
			{ path: "/inventory", element: <div /> },
		],
	},
]);