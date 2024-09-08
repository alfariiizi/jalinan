import Link from "next/link";

export function parseHashTags(inputText: string) {
  const regex = /#[a-zA-Z0-9_]+/g;
  const parts = inputText.split(/(#[a-zA-Z0-9_]+)/g); // Split by hashtag regex

  return parts.map((part, index) => {
    if (regex.test(part)) {
      // If it's a hashtag, return it as a link
      const tag = part.slice(1); // Remove the '#' symbol
      return (
        <Link
          key={index}
          href={`/tags/${tag}`}
          className="text-primary hover:underline"
        >
          {part}
        </Link>
      );
    }

    // Otherwise, return the part as is
    return <span key={index}>{part}</span>;
  });
}
