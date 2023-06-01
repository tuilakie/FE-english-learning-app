export type Course = {
  id: string;
  name: string;
  _count: {
    words: number;
    progress: number;
  };
};

export type Level = {
  id: string;
  name: string;
  courseId: string;
  _count: {
    words: number;
    learned: number;
  };
};
