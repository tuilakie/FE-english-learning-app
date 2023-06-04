import { Course } from "./../api/types.d";
import { Questions } from "../api/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  score: number;
  isStart: boolean;
  questions: Questions;
  Courses: Course[] | undefined;
} = {
  score: 0,
  questions: {} as Questions,
  Courses: [],
  isStart: false,
};

export const quizSlice = createSlice({
  initialState,
  name: "quizSlice",
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Questions>) => {
      state.questions = action.payload;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.Courses = action.payload;
    },
    setIsStart: (state, action: PayloadAction<boolean>) => {
      state.isStart = action.payload;
    },
  },
});

export const { setScore, setQuestions, setCourses, setIsStart } =
  quizSlice.actions;
