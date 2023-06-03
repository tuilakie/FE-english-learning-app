import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Questions, Word } from "../api/types";

const initialState: {
  wordsLearned: number[];
  words: Word[];
  questions: Questions[];
} = {
  wordsLearned: [],
  words: [],
  questions: [],
};

export const caseStudySlice = createSlice({
  initialState,
  name: "caseStudySlice",
  reducers: {
    setWordsLearned: (state, action: PayloadAction<number[]>) => {
      state.wordsLearned = action.payload;
    },
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload;
    },
    pushWord: (state, action: PayloadAction<Word>) => {
      state.words.push(action.payload);
    },
    removeWord: (state) => {
      state.words.shift();
    },
    setQuestions: (state, action: PayloadAction<Questions[]>) => {
      state.questions = action.payload;
    },
    pushQuestion: (state, action: PayloadAction<Questions>) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state) => {
      state.questions.shift();
    },
    swapQuestion: (state) => {
      // random index
      const index = Math.floor(Math.random() * state.questions.length);
      // swap question 0 with random index
      const temp = state.questions[0];
      state.questions[0] = state.questions[index];
      state.questions[index] = temp;
    },
  },
});

export const {
  pushWord,
  setWords,
  setWordsLearned,
  setQuestions,
  removeQuestion,
  removeWord,
  pushQuestion,
  swapQuestion,
} = caseStudySlice.actions;

export default caseStudySlice.reducer;
