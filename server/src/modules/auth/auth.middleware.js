import {
  verifyAccessToken
} from "../../utils/jwt.js";

import userRepository from "../user/user.repository.js";
import ApiError from "../../utils/ApiError.js";

export default async function (
  req,
  res,
  next
) {
  try {
    const header =
      req.headers.authorization;

    if (
      !header ||
      !header.startsWith(
        "Bearer "
      )
    ) {
      throw new ApiError(
        401,
        "Unauthorized"
      );
    }

    const token =
      header.split(" ")[1];

    const payload =
      verifyAccessToken(
        token
      );

    const user =
      await userRepository.findById(
        payload.userId
      );

    if (!user) {
      throw new ApiError(
        401,
        "User not found"
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}