import ApiError from "../utils/ApiError.js";

export default function validate(schema) {
  return async (
    req,
    res,
    next
  ) => {
    try {
      req.validated = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });

      next();
    } catch (error) {
      next(
        new ApiError(
          400,
          "Validation failed",
          error.issues
        )
      );
    }
  };
}