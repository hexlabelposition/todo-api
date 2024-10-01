import User from "../../models/User.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export { getAllUsers, getUserById };
