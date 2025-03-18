import React from 'react'
import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import DataInitializer from './components/DataInitializer'
import SupportChat from './components/SupportChat'
import { AuthProvider, useAuth } from './context/AuthContext'
import Auth from './pages/Auth'
import AboutUs from './pages/AboutUs'

// Dashboard component for admin users
import AdminDashboard from './components/AdminDashboard'

// Protected route component
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user || !profile || !profile.is_admin) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

// Router configuration
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/admin" element={
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataInitializer />
        <AppRoutes />
        <SupportChat />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App