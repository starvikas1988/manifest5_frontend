import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
import OperatorLogin from './components/operator/OperatorLogin';
import OperatorDashboard from './components/operator/OperatorDashboard';
import OperatorProtectedRoute from './components/OperatorProtectedRoute';
import MarketManage from './components/MarketManage';
import AdminReportsDashboard from './components/AdminReportsDashboard';
import ReviewDashboard from './components/ReviewDashboard';
import ReviewMatchCard from './components/ReviewMatchCard';
import ReviewMatchCardView from './components/ReviewMatchCardView';
import Crm from './components/Crm';
import OddsDashboard from './components/OddsDashboard';
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
          path="/review-dashboard"
          element={
            <ProtectedRoute>
              <ReviewDashboard />
            </ProtectedRoute>
          }
        /> 
         <Route
          path="/review-matchCard"
          element={
            <ProtectedRoute>
              <ReviewMatchCard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/review-matchCardView"
          element={
            <ProtectedRoute>
              <ReviewMatchCardView />
            </ProtectedRoute>
          }
        />
       <Route
          path="/odds-dashboard/:matchId"
          element={
            <ProtectedRoute>
              <OddsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crm"
          element={
            <ProtectedRoute>
              <Crm />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin_reports_dashboard"
          element={
            <ProtectedRoute>
              <AdminReportsDashboard />
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
