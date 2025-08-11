export interface Book {
  id?: number;
  title: string;
  author: string;
  description: string;
  userId?: number;
}

export interface BookFormData {
  title: string;
  author: string;
  description: string;
}

export interface BookUpdateData extends BookFormData {
  id: number;
}
