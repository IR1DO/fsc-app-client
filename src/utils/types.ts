export type Post = {
  id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export const emptyPost: Post = {
  id: '',
  title: '',
  category: '',
  content: '',
  image: '',
  createdAt: new Date(0),
  updatedAt: new Date(0),
  authorId: '',
};
