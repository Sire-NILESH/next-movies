"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/components/auth-options";
import { ActionResponse } from "@/types/typings";
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
import AppError from "../app-error";
import db from "../db/prisma";
import { prismaExclude } from "../helpers-server-side";
import { SignUpSchema, TSignUpSchema } from "../validation-schemas";
import {
  handleActionErrResponse,
  handleActionResponse,
} from "./actionResHandler";

export const signUpAction = async function (credentials: TSignUpSchema) {
  try {
    const parsed = SignUpSchema.safeParse(credentials);

    if (!parsed.success)
      // parsed.error.flatten().fieldErrors
      return {
        error: parsed.error.errors.map((err) => err.message).join(".\n"),
      } satisfies ActionResponse;

    // make sure the user does not enter a registered email
    const emailExists = await getUserByEmailAction(parsed.data.email);

    if (emailExists.error) throw new AppError(emailExists.error, 500);

    if (emailExists.data) throw new AppError("Email is already in use", 409);

    // very important to hash the password
    const hash = await generatePasswordHash(parsed.data.password);

    const user = await db.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hash,
      },
      select: prismaExclude("User", ["password", "createdAt", "updatedAt"]),
    });

    // also create 'user list' right away
    // if (user) {
    //   await db.userMediaList.create({
    //     data: {
    //       userId: user.id,
    //     },
    //   });
    // }

    return handleActionResponse(user);
  } catch (error) {
    return handleActionErrResponse(
      error,
      "Error creating user due to internal server error."
    );
  }
};

export const getUserByEmailAction = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return handleActionResponse(user);
  } catch (error) {
    return handleActionErrResponse(
      error,
      "Could not find user, something went wrong"
    );
  }
};

/**
 *Function to generate a hashed password
 * @param password Password to be hashed
 * @returns Promise with hashed password
 */
const generatePasswordHash = async (password: string): Promise<string> => {
  // generates a random salt. A salt is a random value used in the hashing process to ensure
  // that even if two users have the same password, their hashed passwords will be different.
  // The 10 in the function call represents the cost factor, which determines how much
  // computational work is needed to compute the hash.
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

/**
 * Function to compare hashed password against candidate password
 * @param candidatePassword The candidate password to be checked for
 * @param password The hashed password to be compared against.
 * @returns
 */
export const compareHashedPassword = async (
  candidatePassword: string,
  password: string
) => {
  return await bcryptjs.compare(candidatePassword, password);
};

/**
 * Function wrapper to `getCurrentSessionAction` to obtain the current session
 *
 * @returns Session Object Promise
 */
export const getCurrentSessionAction = async () => {
  return getServerSession(authOptions);
};
