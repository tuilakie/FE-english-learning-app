import { CaseStudies } from "./types.d";
import { Word } from "@prisma/client";

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

export type CaseStudies = {
  words: Word[];
  questions: Questions[];
  meta: Meta;
};

export type Questions = {
  word: Word;
  options: Word[] | string[];
  _type: "fill" | "select_word" | "select_meaning";
};

export type Meta = {
  total: number;
  skip: number;
  take: number;
};
