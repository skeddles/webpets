import {Router} from 'express';
import login from './auth/login';
import register from './auth/register';
import authenticate from './auth/authenticate';

const router = Router();

const authRouter = Router();
authRouter.use('/login', login);
authRouter.use('/register', register);

router.use('/auth', authRouter);
router.use(authenticate);

console.log('Authentication middleware loaded');

export default router;