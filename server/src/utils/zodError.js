export default function formatZodError(
  issues
) {
  return issues.map(issue => ({
    path: issue.path.join("."),
    message: issue.message
  }));
}