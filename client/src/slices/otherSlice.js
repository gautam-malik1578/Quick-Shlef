import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  commentId: null,
  commentText: null,
};
const OtherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    setCommentIDAndText(state, action) {
      state.commentId = action.payload.commentId;
      state.commentText = action.payload.commentText;
    },
  },
});
export const { setCommentIDAndText } = OtherSlice.actions;
const otherReducer = OtherSlice.reducer;
export default otherReducer;
