import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { comparePasswords, encryptPassword } from '../../../utils/encrypt';
import { generateToken } from '../../../utils/generateToken';
import { userService } from '../services/UserService';

export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userService.findByEmail(email);
  if (!user || !comparePasswords(password, user.password)) {
    res.status(401);
    throw new Error('bad credentials');
  }
  const token = generateToken({ id: user.id });
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const user = await userService.findByEmail(email);

  if (user) {
    res.status(400);
    throw new Error('Email is already taken');
  }

  const newUser = await userService.save({
    email,
    name,
    password: encryptPassword(password),
  });

  if (!newUser) {
    res.status(400);
    throw new Error('Bad request data');
  }

  const token = generateToken({ id: newUser.id });
  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token,
  });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) throw Error('Something happened in the server :C');
  const user = await userService.findById(id);
  res.status(200).json({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    isAdmin: user?.isAdmin,
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.user?.id;
  if (!id) throw Error('Something happened in the server :C');
  const user = await userService.findById(id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = encryptPassword(password);
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken({ id: updatedUser.id }),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);

  if (result) {
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
