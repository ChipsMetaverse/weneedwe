
import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import DataInitializer from './components/DataInitializer'
import SupportChat from './components/SupportChat'
import DashboardRouter from './components/DashboardRouter'
import { AuthProvider } from './context/AuthContext'
import Auth from './pages/Auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <NotFound />
  },
  {
    path: '/auth',
    element: <Auth />
  }
])

function App() {
  return (
    <AuthProvider>
      <DataInitializer />
      <RouterProvider router={router} />
      <SupportChat />
      <DashboardRouter />
      <Toaster position="top-right" />
    </AuthProvider>
  )
}

export default App
