import { Routes, Route, Navigate } from "react-router-dom";
import { StickyNavbar } from "./components/StickyNavbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Meter from "./pages/Meter";
import Community from "./pages/Community";
import Invoice from "./pages/Invoice";
import Dashboard from "./pages/Dashboard";
import Management from "./pages/Management";
import EditProfile from "./pages/EditProfile";
import { useEffect, useState } from "react";
import { checkLogin } from "./services/authService";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async () => {
    const checkAuthRes = await checkLogin();
    console.log("Auth : " + checkAuthRes);
    if (checkAuthRes == true) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    checkAuth();
    console.log("isAuth : " + isAuth);
  }, []);

  return (
    <>
      <StickyNavbar />
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Management /> : <Navigate to="/login" />}
        />
        <Route
          path="/meter"
          element={isAuth ? <Meter /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/community"
          element={isAuth ? <Community /> : <Navigate to="/login" />}
        />
        <Route
          path="/invoice"
          element={isAuth ? <Invoice /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-profile"
          element={ <EditProfile />}
        />
      </Routes>
    </>
  );
}
