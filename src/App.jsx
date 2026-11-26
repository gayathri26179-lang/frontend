import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import MentorLogin from './pages/MentorLogin';
import CRMApp from './crm/CRMApp';
import './App.css';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-register" element={<Register />} />
      <Route path="/mentor-login" element={<MentorLogin />} />

      {/* AR IT COMPANY - Complete Internship & Student Management CRM Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/internships"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/daily-activities"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/certificates"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentors"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />

      {/* Legacy / Alias paths */}
      <Route
        path="/crm"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crm/*"
        element={
          <ProtectedRoute>
            <CRMApp />
          </ProtectedRoute>
        }
      />

      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
