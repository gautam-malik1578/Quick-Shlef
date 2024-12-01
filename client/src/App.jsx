import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import store from "./slices/store";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Library from "./Pages/Library";
import Converter from "./Pages/Converter";
import Login from "./Pages/Login";
import Me from "./Pages/Me";
import Verify from "./Pages/Verify";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./AppLayout";
import FilterBox from "./components/FilterBox";
import BookItem from "./components/BookItem";
import BookDetail from "./components/BookDetail";
import ConverterBox from "./Pages/ConverterBox";
function App() {
  return (
    <div>
      <Provider store={store}>
        <FilterBox />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Library />} />
              <Route path="/library" element={<Library />} />
            </Route>
            <Route path="/converter" element={<Converter />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Me />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/bookDetail/:id" element={<BookDetail />} />
            <Route path="/tool/:type" element={<ConverterBox />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
