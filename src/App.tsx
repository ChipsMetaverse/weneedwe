
import React, { Suspense } from 'react'
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

// Loading component for Suspense fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

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
        element: (
          <Suspense fallback={<Loading />}>
            <Index />
          </Suspense>
        ),
      },
      {
        path: '/about-us',
        element: (
          <Suspense fallback={<Loading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: '/auth',
        element: (
          <Suspense fallback={<Loading />}>
            <Auth />
          </Suspense>
        ),
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
