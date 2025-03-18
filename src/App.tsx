
import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import DataInitializer from './components/DataInitializer'
import SupportChat from './components/SupportChat'
import { AuthProvider, useAuth } from './context/AuthContext'
import Auth from './pages/Auth'

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
const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Index />,
      errorElement: <NotFound />
    },
    {
      path: '/auth',
      element: <Auth />
    },
    {
      path: '/admin',
      element: (
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      )
    }
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AuthProvider>
      <DataInitializer />
      <Router />
      <SupportChat />
      <Toaster position="top-right" />
    </AuthProvider>
  )
}

export default App
