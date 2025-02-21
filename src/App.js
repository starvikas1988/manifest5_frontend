import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from './components/PublicRoute';
import NotFoundPage from './components/NotFoundPage';
import CreateUser from './components/CreateUser';
import ManageUser from './components/ManageUser';
import MatchAssignment from './components/MatchAssignment';

function App() {
  return (
    <Router>
      <Routes>
          {/* Public Routes */}
          <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute>
              <ManageUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assign_match"
          element={
            <ProtectedRoute>
              <MatchAssignment />
            </ProtectedRoute>
          }
        />
       
         {/* Catch-all Route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
