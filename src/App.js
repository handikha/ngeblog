import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

// @import pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Article from "./pages/article";
import NotFound from "./pages/not-found";
import AboutUs from "./pages/about-us";
import Profile from "./pages/profile";
import Verificaion from "./pages/verification";
import ResetPassword from "./pages/reset-password";

// @import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// @import action
import { keepLogin } from "./store/slices/auth/slices";

import ProtectedRoute from "./protected.routes";
import "./index.css";
import ForgotPassword from "./pages/forgot-password";
import FormUploadImage from "./pages/upload-image";
import PopularArticle from "./pages/popular-article";
import CreateNewArticle from "./pages/create-new-article";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keepLogin());
  }, []);

  const isNavbarVisible =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.includes("/verification") ||
    location.pathname.includes("/reset-password") ||
    location.pathname === "/not-found";

  return (
    <>
      {isNavbarVisible ? null : <Navbar />}

      <main className="bg-light">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/profile/upload-image" element={<FormUploadImage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification/:token" element={<Verificaion />} />
          <Route
            path="/verification-change-email/:token"
            element={<Verificaion />}
          />

          <Route path="/category/:category" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/popular-article/:id" element={<PopularArticle />} />

          <Route
            path="/create-new-article"
            element={
              <ProtectedRoute>
                <CreateNewArticle />
              </ProtectedRoute>
            }
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* <Route path="*" element={<Navigate to="/not-found" />} /> */}
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
        <Toaster />
      </main>

      {isNavbarVisible ? null : <Footer />}
    </>
  );
}
