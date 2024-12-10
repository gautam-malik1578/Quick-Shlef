import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

import store from "./slices/store";

const Signup = React.lazy(() => import("./Pages/Signup"));
// import Signup from "./Pages/Signup";
const Library = React.lazy(() => import("./Pages/Library"));
// import Library from "./Pages/Library";
const Converter = React.lazy(() => import("./Pages/Converter"));
// import Converter from "./Pages/Converter";
const ConverterBox = React.lazy(() => import("./Pages/ConverterBox"));
// import ConverterBox from "./Pages/ConverterBox";
const Login = React.lazy(() => import("./Pages/Login"));
// import Login from "./Pages/Login";
const Me = React.lazy(() => import("./Pages/Me"));
// import Me from "./Pages/Me";
const Verify = React.lazy(() => import("./Pages/Verify"));
// import Verify from "./Pages/Verify";
const PageNotFound = React.lazy(() => import("./Pages/PageNotFound"));
// import PageNotFound from "./Pages/PageNotFound";
const AppLayout = React.lazy(() => import("./AppLayout"));
// import AppLayout from "./AppLayout";
const FilterBox = React.lazy(() => import("./components/FilterBox"));
// import FilterBox from "./components/FilterBox";
const BookDetail = React.lazy(() => import("./components/BookDetail"));
// import BookDetail from "./components/BookDetail";

import ProtectedRoute from "./components/ProtectedRoute";

import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import LoaderAnnimation from "./annimations/Loading.json";
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
            <Suspense
              fallback={<Loader anni={LoaderAnnimation} text="Loading..." />}
            >
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Library />} />
                  <Route path="/library" element={<Library />} />
                </Route>
                <Route
                  path="/converter"
                  element={<ProtectedRoute element={<Converter />} />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/me"
                  element={<ProtectedRoute element={<Me />} />}
                />
                <Route path="/verify" element={<Verify />} />
                <Route path="/bookDetail/:id" element={<BookDetail />} />
                <Route
                  path="/tool/:type"
                  element={<ProtectedRoute element={<ConverterBox />} />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster
            position="bottom-right"
            gutter={12}
            toastOptions={{
              success: { duration: 1500 },
              error: { duration: 3000 },
              style: {
                fontSize: "12px",
                maxWidth: "500px",
                padding: "4px 8px",
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
