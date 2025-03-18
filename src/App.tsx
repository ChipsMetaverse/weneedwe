
import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import DataInitializer from './components/DataInitializer'
import SupportChat from './components/SupportChat'
import { AuthProvider } from './context/AuthContext'
import Auth from './pages/Auth'

// Dashboard component for admin users will be conditionally rendered inside the protected route
import AdminDashboard from './components/AdminDashboard'

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
    element: <AdminDashboard />
  }
])

function App() {
  return (
    <AuthProvider>
      <DataInitializer />
      <RouterProvider router={router} />
      <SupportChat />
      <Toaster position="top-right" />
    </AuthProvider>
  )
}

export default App
