import { findAllUsers, findUserById } from "./users.service.js";

const getAllUsers = async (request, response, next) => {
  try {
    const users = await findAllUsers();
    return response.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (request, response, next) => {
  try {
    const { userId } = request.params;
    const user = await findUserById(userId);
    return response.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUserById };
