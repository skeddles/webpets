import {Router} from 'express';
import login from './auth/login';
import register from './auth/register';
import authenticate from './auth/authenticate';

const router = Router();

router.use('/login', login);
router.use('/register', register);
router.use(authenticate);
console.log('Authentication middleware loaded');

export default router;