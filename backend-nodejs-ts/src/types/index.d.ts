import express from "express";
import { User } from '../modules/user/models/UserModel';

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}