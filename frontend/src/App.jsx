import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FileManagement from './components/FileManagement';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const App = () => {
  const files = [
    { type: "PDF", uploadedBy: "Alice" },
    { type: "TXT", uploadedBy: "Bob" },
    { type: "XLSX", uploadedBy: "Alice" },
    { type: "PDF", uploadedBy: "Charlie" },
    { type: "PDF", uploadedBy: "Bob" },
  ];
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout />
                <Dashboard files={files}/>
            </ProtectedRoute>
          } 
        />
      
        <Route 
          path="/files" 
          element={
            <ProtectedRoute>
              <Layout />
                <FileManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Layout />
                <UserProfile />
            </ProtectedRoute>
          } 
        />

        {/* 404 Page */}
        <Route path="*" element={<div className='text-4xl font-bold text-center'>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

