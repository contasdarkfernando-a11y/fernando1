export interface Book {
  id: string;
  title: string;
  author: string;
  summary: string;
  cover: string;
  driveLink: string;
  category?: string;
  isAudiobook?: boolean;
  audioUrl?: string;
  duration?: string;
}

export interface BookSection {
  id: string;
  title: string;
  books: Book[];
  isAZ?: boolean;
  isAudiobooks?: boolean;
}

export interface Library {
  featured: Book;
  sections: BookSection[];
}