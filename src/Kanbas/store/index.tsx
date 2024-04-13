import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import quizReducer from "../Courses/Quizzes/quizzesReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    quizzesReducer
  }
});


export default store;