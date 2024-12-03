import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  userId: null,
  username: "",
  token: "",
  gender: "",
  email: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogoutUser(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.userId = null;
      state.username = "";
      state.gender = "";
      state.email = "";
    },
    setUserData(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.gender = action.payload.gender || "male";
      state.email = action.payload.email;
    },
  },
});
export const { LogoutUser, setUserData } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
