import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import store from "./slices/store";
import Signup from "./Pages/Signup";
import Library from "./Pages/Library";
import Converter from "./Pages/Converter";
import Login from "./Pages/Login";
import Me from "./Pages/Me";
import Verify from "./Pages/Verify";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./AppLayout";
import FilterBox from "./components/FilterBox";
import BookDetail from "./components/BookDetail";
import ConverterBox from "./Pages/ConverterBox";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
          <Toaster
            position="bottom-right"
            gutter={12}
            toastOptions={{
              success: { duration: 1500 },
              error: { duration: 3000 },
              style: {
                fontSize: "14px",
                maxWidth: "500px",
                padding: "8px 16px",
                backgroundColor: "#ff385c",
                color: "#fff",
              },
            }}
          />
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
