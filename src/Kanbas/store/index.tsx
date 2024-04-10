import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer
  }
});


export default store;