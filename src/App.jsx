import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import { useDispatch } from 'react-redux';
import { isLogin } from './redux/login/action';
import { refesh } from './service/api';
import SignUpPage from './pages/auth/register';
import AdminHomePage from './pages/admin/adminHomePage';
import UserPage from './pages/admin/outlet/user page/users';

const App = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const refesht = await refesh();
      if (refesht && refesht.data) {
        dispatch(isLogin(refesht.data));
      } else {
        throw new Error('Refresh failed: No data returned');
      }
    } catch (error) {
      console.error('Refresh failed. Retrying...', error);

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signUp',
      element: <SignUpPage />,
    },
    {
      path: '/adminPage',
      element: <AdminHomePage />,
      children: [
        {
          path: 'users',
          element: <UserPage />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
