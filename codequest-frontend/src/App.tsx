import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AskQuestionPage from './pages/AskQuestionPage';
import TagsPage from './pages/TagsPage';
import './App.css';

function App() {
  const isLoggedIn = false; // This would normally come from auth context

  return (
    <Router>
      <Routes>
        <Route element={<Layout isLoggedIn={isLoggedIn} />}>
          <Route index element={<HomePage />} />
          <Route path="questions">
            <Route index element={<HomePage />} />
            <Route
              path="ask"
              element={
                isLoggedIn ? (
                  <AskQuestionPage />
                ) : (
                  <Navigate to="/login" state={{ from: '/questions/ask' }} />
                )
              }
            />
          </Route>
          <Route path="tags" element={<TagsPage />} />
          <Route path="users" element={<div>Users Page (Coming Soon)</div>} />
          <Route path="companies" element={<div>Companies Page (Coming Soon)</div>} />
          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
