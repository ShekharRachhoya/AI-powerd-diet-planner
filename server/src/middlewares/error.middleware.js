export default function errorMiddleware(
  error,
  req,
  res,
  next
) {
  const status = error.statusCode || 500;

  return res.status(status).json({
    success: false,
    message: error.message,
    errors: error.errors || []
  });
}