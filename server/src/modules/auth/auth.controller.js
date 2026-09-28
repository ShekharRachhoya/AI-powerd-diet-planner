import authService from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const googleLogin =
  asyncHandler(
    async (req, res) => {
      const { idToken } =
        req.body;

      const data =
        await authService.googleLogin(
          idToken
        );

      return res.json(
        new ApiResponse(
          200,
          data,
          "Login successful"
        )
      );
    }
  );

export const refresh =
  asyncHandler(
    async (req, res) => {
      const {
        refreshToken
      } = req.body;

      const data =
        await authService.refreshToken(
          refreshToken
        );

      return res.json(
        new ApiResponse(
          200,
          data,
          "Token refreshed"
        )
      );
    }
  );

export const logout =
  asyncHandler(
    async (req, res) => {
      await authService.logout(
        req.user._id,
        req.body
          .refreshToken
      );

      return res.json(
        new ApiResponse(
          200,
          null,
          "Logged out"
        )
      );
    }
  );

export const logoutAll =
  asyncHandler(
    async (req, res) => {
      await authService.logoutAll(
        req.user._id
      );

      return res.json(
        new ApiResponse(
          200,
          null,
          "Logged out everywhere"
        )
      );
    }
  );