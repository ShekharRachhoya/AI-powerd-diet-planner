export default function extractJson(
  text
) {
  const match =
    text.match(
      /```json([\s\S]*?)```/
    );

  if (match) {
    return match[1].trim();
  }

  return text.trim();
}