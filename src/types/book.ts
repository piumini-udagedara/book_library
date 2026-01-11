export interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  category: string;
  cover: string;
}

export interface BookFormData {
  title: string;
  author: string;
  rating: number;
  category: string;
  cover: string;
}
export type ViewMode = "grid" | "list";
