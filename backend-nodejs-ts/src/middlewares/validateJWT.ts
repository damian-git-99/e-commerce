import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { userService } from '../modules/user/services/UserService';

export const validateJwt = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      res.status(401);
      throw new Error('invalid token');
    }

    const token = authorizationHeader.replace('Bearer ', '');

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
      const user = await userService.findById(id);

      if (!user) {
        res.status(404);
        throw new Error('user not found');
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401);
      throw new Error('invalid token: ' + err);
    }
  }
);

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
