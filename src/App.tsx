import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import DataInitializer from './components/DataInitializer'
import SupportChat from './components/SupportChat'
import DashboardRouter from './components/DashboardRouter'
import { AuthProvider } from './context/AuthContext'
import Auth from './pages/Auth'
import AboutUs from './pages/AboutUs'

// Wrapper component that provides auth context
const AppLayout = () => {
  return (
    <AuthProvider>
      <DataInitializer />
      <Outlet />
      <SupportChat />
      <DashboardRouter />
      <Toaster position="top-right" />
    </AuthProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
        path: '/about-us',
        element: <AboutUs />
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
