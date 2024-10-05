import mongoose from "mongoose";
import User from "../../models/User.js";
import createHttpError from "http-errors";

const findAllUsers = async () => {
  return await User.find();
};

const findUserById = async (userId) => {
  const validId = User.isValidObjectId(userId);
  
  if (!validId) {
    throw new createHttpError.BadRequest("Invalid user ID");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new createHttpError.NotFound("User not found");
  }

  return user;
};

export { findAllUsers, findUserById };
