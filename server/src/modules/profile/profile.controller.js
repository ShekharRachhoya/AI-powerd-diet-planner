import profileService from './profile.service.js';
import ApiResponse from '../../utils/ApiResponse.js';

class ProfileController {
  createOrUpdate = async (
    req,
    res,
    next
  ) => {
    try {
      const profile =
        await profileService
          .upsertProfile(
            req.user.id,
            req.body
          );

      return res.json(
        new ApiResponse(
          200,
          profile,
          'Profile saved'
        )
      );
    } catch (error) {
      next(error);
    }
  };

  get = async (
    req,
    res,
    next
  ) => {
    try {
      const profile =
        await profileService.getProfile(
          req.user.id
        );

      return res.json(
        new ApiResponse(
          200,
          profile
        )
      );
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req,
    res,
    next
  ) => {
    try {
      await profileService.deleteProfile(
        req.user.id
      );

      return res.json(
        new ApiResponse(
          200,
          null,
          'Profile deleted'
        )
      );
    } catch (error) {
      next(error);
    }
  };
}

export default new ProfileController();