import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// import Login from "./pages/Auth/Auth";
// import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import GigPage from "./pages/Gigs/GigPage";
import GigDetails from "./pages/Gigs/GigDetails";
import GroupsList from "./pages/Groups/GroupsList";
import GroupDetails from "./pages/Groups/GroupDetails";
import PaymentsList from "./pages/Payments/PaymentsList";
import PaymentDetails from "./pages/Payments/PaymentDetails";

import Navbar from "./components/Navbar";
import AuthWrapper from "./components/AuthWrapper";
import Auth from "./pages/Auth/Auth";
import EcoHeroGigs from "./pages/Gigs/EcoHeroGigs";

// App component (App.js)
const App = () => (
  <div className="flex min-h-screen">
    <Navbar />
    <div className="flex-1 bg-gray-100">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Auth />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Protected Routes */}
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gigs" element={<GigPage />} />
          <Route path="/gigs/:id" element={<GigDetails />} />
          <Route path="/gigs/ecoHero/:id" element={<EcoHeroGigs />} />
          <Route path="/groups" element={<GroupsList />} />
          <Route path="/groups/:id" element={<GroupDetails />} />
          <Route path="/payments" element={<PaymentsList />} />
          <Route path="/payments/:id" element={<PaymentDetails />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <ToastContainer />
  </div>
);

export default App;

