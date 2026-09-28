import dietPlanService from './dietPlan.service.js';
import  ApiResponse  from '../../utils/ApiResponse.js';

class DietPlanController {
  generate = async (
    req,
    res,
    next
  ) => {
    try {
      const plan =
        await dietPlanService.generate(
          req.user.id
        );

      return res.status(202).json(
        new ApiResponse(
          202,
          plan,
          'Diet plan generation started'
        )
      );
    } catch (error) {
      next(error);
    }
  };

  latest = async (
    req,
    res,
    next
  ) => {
    try {
      const plan =
        await dietPlanService.getLatest(
          req.user.id
        );

      return res.json(
        new ApiResponse(
          200,
          plan
        )
      );
    } catch (error) {
      next(error);
    }
  };
}

export default new DietPlanController();