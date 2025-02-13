import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from './components/PublicRoute';
import OperatorPublicRoute from './components/OperatorPublicRoute';
import NotFoundPage from './components/NotFoundPage';
import CreateUser from './components/CreateUser';
import ManageUser from './components/ManageUser';
import MatchAssignment from './components/MatchAssignment';
import CategoryManage from './components/CategoryManage';
import TicketDashboard from './components/TicketDashboard';
import OperatorLogin from './components/OperatorLogin';
import OperatorDashboard from './components/OperatorDashboard';
import OperatorProtectedRoute from './components/OperatorProtectedRoute';
import MarketManage from './components/MarketManage';
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
          path="/login/operator"
          element={
            <OperatorPublicRoute>
              <OperatorLogin />
            </OperatorPublicRoute>
          }
        />
        <Route
          path="/operator_dashboard"
          element={
            <OperatorProtectedRoute>
              <OperatorDashboard />
            </OperatorProtectedRoute>
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
          path="/manage-market"
          element={
            <ProtectedRoute>
              <MarketManage />
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
          <Route
          path="/category_manage"
          element={
            <ProtectedRoute>
              <CategoryManage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/manage-ticket"
          element={
            <ProtectedRoute>
              <TicketDashboard />
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
