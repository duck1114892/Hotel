import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin } from './redux/login/action';
import { refesh } from './service/api';
import SignUpPage from './pages/auth/register';
import AdminHomePage from './pages/admin/adminHomePage';
import UserPage from './pages/admin/outlet/user page/users';
import HotelPage from './pages/admin/outlet/hotel Page/hotel';
import BookingPage from './pages/admin/outlet/booking Page/booking';
import { message } from 'antd';
import HomePage from './pages/user/homePage';

import RoomDetail from './pages/user/outlet/roomDetail';
import Home from './pages/user/outlet/home';
import HotelHome from './pages/user/outlet/hotelHome';
import RoomHome from './pages/user/outlet/roomHome';
import HotelDetail from './pages/user/outlet/hotelDetail';
import BookingDetail from './pages/user/outlet/bookingDetail';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const refesht = await refesh();
      if (refesht && refesht.data) {
        dispatch(isLogin(refesht.data));
      } else {
        throw new Error('Refresh failed: No data returned');
      }

    };
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
        }, {
          path: 'hotels',
          element: <HotelPage />,
        },
        {
          path: 'bookings',
          element: <BookingPage />,
        },
      ],
    },
    {
      path: '',
      element: <HomePage />,
      children: [
        {
          path: '/',
          element: <Home />,

        },
        {
          path: 'hotelDetail/:id',
          element: <HotelDetail />,
        },
        {
          path: 'booking',
          element: <BookingDetail />,
        },
        {
          path: 'hotel',
          element: <HotelHome />,
          children: [
            {
              path: ':sort',
              element: <HotelHome />,
            },
          ]
        },
        {
          path: 'room/',
          element: <RoomHome />,
          children: [
            {
              path: ':sort',
              element: <RoomHome />,
            },
            {
              path: ':address/:price',
              element: <RoomHome />,
            }
          ]
        },
      ]
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
