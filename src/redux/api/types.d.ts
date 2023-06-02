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

export type Word = {
  courseId: string;
  levelId: string;
  id: string;
  ipa: string;
  word: string;
  meaning: string;
  sub: string;
  learned?: boolean;
};

export type LevelDetail = {
  id: string;
  name: string;
  courseId: string;
  _count: {
    words: number;
  };
  words: Word[];
};
