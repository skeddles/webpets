import {createRouter} from '../../utilities/create-router.js';

export default createRouter({}, async (req, res) => {
	res.status(200).json({ message: 'Server is running' });
});