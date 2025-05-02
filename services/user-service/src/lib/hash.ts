import * as bcrypt from "bcrypt";

export const HashedPassword = async (password: string) => {
  try {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Failed to hash password", error as Error);
  }
};

export const ComparePassword = async (userPassword: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(userPassword, hashPassword);
  } catch (error) {
    throw new Error("Failed to compare password", error as Error);
  }
};
