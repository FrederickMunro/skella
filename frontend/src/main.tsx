import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './main.css'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Pools from "./components/Pools/Pools";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    )
  },
  {
    path: '/pools',
    element: (
      <>
        <Header />
        <Pools />
      </>
    )
  },
  {
    path: '/excavation',
    element: (
      <>
        <Header />
        <Pools />
      </>
    )
  },
  {
    path: '/estimate',
    element: (
      <>
        <Header />
        <Pools />
      </>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
