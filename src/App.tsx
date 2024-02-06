import { Routes, Route } from "react-router-dom";
import { StickyNavbar } from "./components/StickyNavbar";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Meter from "./pages/Meter";
import Community from "./pages/Community";
import Invoice from "./pages/Invoice";
import Dashboard from "./pages/Dashboard";
import Management from "./pages/Management";
export default function App() {
  return (
    <>
      <StickyNavbar />
      <Routes>
        <Route path="/" element={<Management />} />
        <Route path="/meter" element={<Meter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<Community />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
