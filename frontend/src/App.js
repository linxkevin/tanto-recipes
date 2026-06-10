import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StaffApp from './pages/StaffApp';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRecipeEdit from './pages/AdminRecipeEdit';

function RequireAuth({ children }) {
  const token = localStorage.getItem('tanto_token');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaffApp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        <Route path="/admin/recipe/new" element={<RequireAuth><AdminRecipeEdit /></RequireAuth>} />
        <Route path="/admin/recipe/:id" element={<RequireAuth><AdminRecipeEdit /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}
