import { hashPassword } from "../../lib/bcrypt";
import prisma from "../../prisma";
import { User } from "../../types/user.type";

export const registerService = async (body: Omit<User, "id">) => {
  try {
    const { email, password } = body;
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error("email already exist");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });

    return {
      message: "register success",
      data: newUser,
    };
  } catch (error) {
    throw error;
  }
};
