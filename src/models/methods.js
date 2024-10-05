import bcrypt from "bcrypt";

const comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

const methods = {
  comparePassword,
};

export default methods;
