import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";
import otherReducer from "./otherSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    search: searchReducer,
  },
});
export default store;
