import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchString: "",
  searchtype: "title", // other one will be by author (at the end of the day we are only finding the books )
  showFilterBox: false,
  releasedYear: 2020,
  isAvaliable: 0, //0- means does not matter -1  means only downloadable and 1 means non downloadedble
  genre: ["any"],
  maxSize: 5,
  minSize: 1, // we are talking in mb mate
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchTypeToAuthor(state) {
      state.searchtype = "author";
    },
    searchTypeToTitle(state) {
      state.searchtype = "title";
    },
    setMaxSize(state, action) {
      state.maxSize = action.payload.maxSize;
    },
    setMinSize(state, action) {
      state.minSize = action.payload.minSize;
    },
    setReleasedYear(state, action) {
      state.releasedYear = action.payload.releasedYear;
    },
    setIsAvailable(state, action) {
      state.isAvaliable = action.payload.isAvaliable;
    },
    setGenre(state, action) {
      state.genre = [];
      state.genre = action.payload.genre;
    },
    showFilterBox(state, action) {
      state.showFilterBox = true;
      //   console.log("set the showfilter to true");
    },
    hideFilterBox(state, action) {
      state.showFilterBox = false;
    },
    setSearchString(state, action) {
      state.searchString = action.payload.searchString;
    },
  },
});
export const {
  searchTypeToAuthor,
  searchTypeToTitle,
  setGenre,
  setIsAvailable,
  setMaxSize,
  setMinSize,
  setReleasedYear,
  setSearchString,
  showFilterBox,
  hideFilterBox,
} = searchSlice.actions; // now they shall be avalible in the app to call and alter the statr of our sizlce
const searchReducer = searchSlice.reducer;
export default searchReducer;
