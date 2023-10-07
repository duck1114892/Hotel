import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import BookPage from './pages/bookPage';
import PayPage from './pages/payment';
import HomePage from './pages/homePage';
import LoginPage from './pages/auth/login';
import SignUpPage from './pages/auth/register';
import BookDetailPage from './pages/bookDetailPage';
import { refeshToken } from './service/api';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin } from './redux/login/action';
import loginReducer from './redux/login/asscess';

export default function App() {
  const dispatch = useDispatch()
  const dataReduce = useSelector(state => state.loginReducer)
  console.log('lmao>>>>', dataReduce)
  const getInfo = async () => {
    const token = await refeshToken()
    dispatch(isLogin(token.data.user))
    console.log('hahah', token)
  }
  useEffect(() => {

    getInfo()

  }, [])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>
        <HomePage></HomePage>
      </div>,
      children: [
        {
          path: '/book',
          element: <BookPage />
        },

        {
          path: '/payment',
          element: <PayPage />
        }
      ]
    },
    {
      path: '/book-detail/:id',
      element: <BookDetailPage />
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/sign-up",
      element: <SignUpPage></SignUpPage>,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
