import Link from "next/link";

export function parseHashTagsAndLinks(inputText: string) {
  const hashTagRegex = /#[a-zA-Z0-9_]+/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const parts = inputText.split(/(#[a-zA-Z0-9_]+|https?:\/\/[^\s]+)/g); // Split by hashtag or link regex

  return parts.map((part, index) => {
    if (hashTagRegex.test(part)) {
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
    } else if (urlRegex.test(part)) {
      // If it's a URL, return it as a clickable link
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {part}
        </a>
      );
    }

    // Otherwise, return the part as is
    return <span key={index}>{part}</span>;
  });
}
