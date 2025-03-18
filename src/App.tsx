import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import SupportChat from './components/SupportChat'
import DashboardRouter from './components/DashboardRouter'
import { AuthProvider } from './context/AuthContext'
import Auth from './pages/Auth'
import AboutUs from './pages/AboutUs'

// Wrapper component that provides auth context and other global components
const AppLayout = () => {
  return (
    <>
      <Outlet />
      <SupportChat />
      <DashboardRouter />
      <Toaster position="top-right" />
    </>
  )
}

// Main router configuration
const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App