/**
 * Available book categories
 */
export const CATEGORIES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Dystopian",
  "Biography",
  "History",
  "Self-Help",
  "Leadership",
  "Biography",
] as const;

export type Category = (typeof CATEGORIES)[number];
