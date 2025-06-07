import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Route with Navbar */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreatePoll />} />
        </Route>

        {/* Standalone Routes (no Navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
