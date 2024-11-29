import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});
export default store;
