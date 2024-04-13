import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  quizzes: [] as {
    _id: string;
    name: string;
    quizType: string;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: string;
    timeLimit: number;
    multipleAttempts: string;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: string;
    webcamRequired: string;
    lockQuestionsAfterAnswering: string;
    dueDate: Date;
    availableDate: Date;
    untilDate: Date;
  }[],
  quiz: {
    name: "New Quiz",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: 20,
    multipleAttempts: "No",
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: "Yes",
    webcamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    dueDate: new Date(),
    availableDate: new Date(),
    untilDate: new Date()
  },
};


const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },

    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },

    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});


export const { addQuiz, deleteQuiz,
  updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;