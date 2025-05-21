import React, { Suspense, lazy } from 'react'
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
import VolunteerPage from './pages/Volunteer'

// Lazy-loaded pages for better performance
const BWSELFProgram = lazy(() => import('./pages/programs/BWSELFProgram'))
const WebinarSeries = lazy(() => import('./pages/programs/WebinarSeries'))
const ResourceCenter = lazy(() => import('./pages/programs/ResourceCenter'))
const JustTheFacts = lazy(() => import('./pages/programs/JustTheFacts'))
const BlogPage = lazy(() => import('./pages/Blog'))
const LinkageToHIVMedicalPlan = lazy(() => import('./pages/blog/LinkageToHIVMedicalPlan'))
const DonatePage = lazy(() => import('./pages/Donate'))

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
            <AboutUs />
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
        path: '/volunteer',
        element: (
          <Suspense fallback={<Loading />}>
            <VolunteerPage />
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
        path: '/programs/bw-self',
        element: (
          <Suspense fallback={<Loading />}>
            <BWSELFProgram />
          </Suspense>
        ),
      },
      {
        path: '/webinars',
        element: (
          <Suspense fallback={<Loading />}>
            <WebinarSeries />
          </Suspense>
        ),
      },
      {
        path: '/resources',
        element: (
          <Suspense fallback={<Loading />}>
            <ResourceCenter />
          </Suspense>
        ),
      },
      {
        path: '/blog',
        element: (
          <Suspense fallback={<Loading />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: '/blog/linkage-to-hiv-medical-plan',
        element: (
          <Suspense fallback={<Loading />}>
            <LinkageToHIVMedicalPlan />
          </Suspense>
        ),
      },
      {
        path: '/donate',
        element: (
          <Suspense fallback={<Loading />}>
            <DonatePage />
          </Suspense>
        ),
      },
      {
        path: '/just-the-facts',
        element: (
          <Suspense fallback={<Loading />}>
            <JustTheFacts />
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
