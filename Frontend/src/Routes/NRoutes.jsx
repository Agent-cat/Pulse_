import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Gallery from "../Pages/Gallery";
import Events from "../Pages/Events";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import About from "../Pages/About";
import Alumini from "../Pages/Alumini";
import Blood from "../Pages/Blood";

import ProtectedRoute from "../utils/ProtectedRoute";

import AdminPanel from "../Pages/AdminPanel";
import RegisteredEvents from "../Pages/RegisteredEvents";
import AuthRoute from "../utils/AuthRoute";
import { getUser } from "../utils/auth";
import PleaseLogin from "../Pages/PleaseLogin";
import ForgotPassword from "../Components/ForgotPassword";
import UserDetails from "../Pages/UserDetails";
import Team from "../Pages/Team";
import Faculty from "../Pages/Faculty";
import Zrotriya from "../Pages/Zrotriya";

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
