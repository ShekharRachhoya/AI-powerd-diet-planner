import authRepository from "./auth.repository.js";
import userRepository from "../user/user.repository.js";

import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "../../utils/jwt.js";

import ApiError from "../../utils/ApiError.js";

import { verifyGoogleToken } from "./google.service.js";

class AuthService {
  async googleLogin(idToken) {
    const payload =
      await verifyGoogleToken(
        idToken
      );

    if (!payload.email_verified) {
      throw new ApiError(
        401,
        "Google account not verified"
      );
    }

    let user =
      await userRepository.findByEmail(
        payload.email
      );

    if (!user) {
      user =
        await userRepository.create({
          googleId: payload.sub,
          email: payload.email,
          name: payload.name,
          picture:
            payload.picture,
          isVerified: true
        });
    }

    const accessToken =
      signAccessToken({
        userId: user._id
      });

    const refreshToken =
      signRefreshToken({
        userId: user._id
      });

    user.refreshTokens.push({
      token: refreshToken
    });

    await user.save();

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async refreshToken(
    refreshToken
  ) {
    const payload =
      verifyRefreshToken(
        refreshToken
      );

    const user =
      await authRepository.findById(
        payload.userId
      );

    if (!user) {
      throw new ApiError(
        401,
        "Invalid token"
      );
    }

    const exists =
      user.refreshTokens.some(
        t =>
          t.token ===
          refreshToken
      );

    if (!exists) {
      throw new ApiError(
        401,
        "Token revoked"
      );
    }

    user.refreshTokens =
      user.refreshTokens.filter(
        t =>
          t.token !==
          refreshToken
      );

    const newAccess =
      signAccessToken({
        userId: user._id
      });

    const newRefresh =
      signRefreshToken({
        userId: user._id
      });

    user.refreshTokens.push({
      token: newRefresh
    });

    await user.save();

    return {
      accessToken:
        newAccess,
      refreshToken:
        newRefresh
    };
  }

  async logout(
    userId,
    refreshToken
  ) {
    const user =
      await authRepository.findById(
        userId
      );

    if (!user) return;

    user.refreshTokens =
      user.refreshTokens.filter(
        t =>
          t.token !==
          refreshToken
      );

    await user.save();
  }

  async logoutAll(userId) {
    const user =
      await authRepository.findById(
        userId
      );

    if (!user) return;

    user.refreshTokens = [];

    await user.save();
  }
}

export default new AuthService();