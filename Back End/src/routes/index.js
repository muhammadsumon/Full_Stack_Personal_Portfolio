/* eslint-disable no-unused-vars */
import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// layouts
import RoleBasedGuard from '../guards/RoleBasedGuard';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';

// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        { path: 'auth/login', element: <Login /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/analytics" replace /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        {
          path: 'project',
          children: [
            { element: <Navigate to="/dashboard/project/list" replace /> },
            { path: 'list', element: <ProjectList /> },
            { path: 'new', element: <ProjectCreate /> },
            { path: ':id/edit', element: <ProjectEdit /> }
          ]
        },
        {
          path: 'type',
          children: [
            { element: <Navigate to="/dashboard/type/list" replace /> },
            { path: 'list', element: <TypeList /> },
            { path: 'new', element: <TypeCreate /> },
            { path: ':id/edit', element: <TypeCreate /> }
          ]
        },
        {
          path: 'category',
          children: [
            { element: <Navigate to="/dashboard/category/list" replace /> },
            { path: 'list', element: <CategoryList /> },
            { path: 'new', element: <CategoryCreate /> },
            { path: ':id/edit', element: <CategoryCreate /> }
          ]
        },
        {
          path: 'technology',
          children: [
            { element: <Navigate to="/dashboard/technology/list" replace /> },
            { path: 'list', element: <TechnologyList /> },
            { path: 'new', element: <TechnologyCreate /> },
            { path: ':id/edit', element: <TechnologyCreate /> }
          ]
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace /> },
            {
              path: 'list',
              element: (
                <RoleBasedGuard>
                  <UserList />
                </RoleBasedGuard>
              )
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard>
                  <UserCreate />
                </RoleBasedGuard>
              )
            },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" />
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
// Dashboard
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/user/UserAccount')));

const ProjectList = Loadable(lazy(() => import('../pages/dashboard/project/ProjectList')));
const TypeList = Loadable(lazy(() => import('../pages/dashboard/types/TypeList')));
const CategoryList = Loadable(lazy(() => import('../pages/dashboard/categories/CategoryList')));
const TechnologyList = Loadable(lazy(() => import('../pages/dashboard/technologies/TechnologyList')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/user/UserList')));

const ProjectCreate = Loadable(lazy(() => import('../pages/dashboard/project/ProjectCreate')));
const TypeCreate = Loadable(lazy(() => import('../pages/dashboard/types/TypeCreate')));
const CategoryCreate = Loadable(lazy(() => import('../pages/dashboard/categories/CategoryCreate')));
const TechnologyCreate = Loadable(lazy(() => import('../pages/dashboard/technologies/TechnologyCreate')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/user/UserCreate')));

const ProjectEdit = Loadable(lazy(() => import('../pages/dashboard/project/ProjectEdit')));

// Main
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));