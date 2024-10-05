import mongoose from "mongoose";

const isValidObjectId = (userId) => {
  return mongoose.Types.ObjectId.isValid(userId);
};

const statics = {
  isValidObjectId,
};

export default statics;
