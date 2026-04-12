import { prisma } from "@/common/config/prisma";
import type { IUser } from "./dto/register.dto";
import ApiError from "@/common/utils/apiError";
import { comparePassword, hashPassword } from "@/common/utils/bcrypt";
import type { ILogin } from "./dto/login.dto";
import { generateToken } from "@/common/utils/jwt";

export const register = async (data: IUser) => {
  const existing = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existing) throw ApiError.conflict("Email already registered");

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName || '',
      phone: data.phone,  
      email: data.email,
      password: hashedPassword,
    },
  });

  return user;
};

export const login = async (data: ILogin) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) throw ApiError.unauthorized("Email or password is incorrect");

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) throw ApiError.unauthorized("Email or password is incorrect");

  const token = await generateToken({ userId: user.id, email: user.email, role: user.role });
  return { token };
};

export const getMe = async (userId ?: number) => {
  if (!userId) throw ApiError.unauthorized("User ID is missing");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    }
  });
  return user;
};
