import { z, ZodRawShape } from 'zod';
import { Router, Request, Response, NextFunction } from 'express';
import asyncRoute from './async-route';
import validateRequestBody from './validate-request-body';

export function createRouter(bodySchema: object, asyncRouterFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
	const router = Router();
	router.post('/', validateRequestBody(bodySchema as ZodRawShape), asyncRoute(asyncRouterFunction));
	return router;
}

export const is = z;