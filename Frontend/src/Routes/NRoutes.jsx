import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../utils/ProtectedRoute";
import AuthRoute from "../utils/AuthRoute";
import { getUser } from "../utils/auth";

// Lazy load pages for better performance
const Home = lazy(() => import("../Pages/Home"));
const Gallery = lazy(() => import("../Pages/Gallery"));
const Events = lazy(() => import("../Pages/Events"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const About = lazy(() => import("../Pages/About"));
const Alumini = lazy(() => import("../Pages/Alumini"));
const Blood = lazy(() => import("../Pages/Blood"));
const AdminPanel = lazy(() => import("../Pages/AdminPanel"));
const RegisteredEvents = lazy(() => import("../Pages/RegisteredEvents"));
const PleaseLogin = lazy(() => import("../Pages/PleaseLogin"));
const ForgotPassword = lazy(() => import("../Components/ForgotPassword"));
const UserDetails = lazy(() => import("../Pages/UserDetails"));
const Team = lazy(() => import("../Pages/Team"));
const Faculty = lazy(() => import("../Pages/Faculty"));
const Zrotriya = lazy(() => import("../Pages/Zrotriya"));

const NRoutes = () => {
  const user = getUser();
  const isAdmin = user?.role === "admin";

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />
      <Route path="/blood" element={<Blood />} />
      <Route path="/alumini" element={<Alumini />} />
      <Route path="/team" element={<Team />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/zrotriya" element={<Zrotriya />} />

      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/registered-events"
        element={
          <ProtectedRoute>
            <RegisteredEvents />
          </ProtectedRoute>
        }
      />

      <Route path="/please-login" element={<PleaseLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            {isAdmin ? <AdminPanel /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/user-details/:email"
        element={
          <ProtectedRoute>
            {isAdmin ? <UserDetails /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default NRoutes;
