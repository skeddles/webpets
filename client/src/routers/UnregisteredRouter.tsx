import { createBrowserRouter } from "react-router";

import Layout from "../layouts/LayoutUnauthenticated";
import Unauthenticated from "../pages/Unauthenticated";
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

export const unregisteredRouter = createBrowserRouter([
	{ Component: Layout, children: [
		{ path: "/", element: <Unauthenticated/>},
		{ path: "/login", element: <Login />},
		{ path: "/register", element: <Register />},
		{ path: "*", element: <NotFound /> }
	]}
]);