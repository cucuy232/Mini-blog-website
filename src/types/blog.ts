
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  dislikes: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
  likes: number;
  dislikes: number;
  readCount: number;
  comments: Comment[];
}
