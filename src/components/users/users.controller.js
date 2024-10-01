import * as service from "./users.service.js";

const getAllUsers = async (request, response, next) => {
  try {
    const users = await service.getAllUsers();
    return response.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (request, response, next) => {
  try {
		const { userId } = request.params;
    const user = await service.getUserById(userId);
    return response.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUserById };
