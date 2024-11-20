import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './main.css'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Pools from "./components/Pools/Pools";
import Portfolio from "./components/Portfolio/Portfolio";
import Amenagement from "./components/Amenagement/Amenagement";
import Excavation from "./components/Excavation/Excavation";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Experience from "./components/Experience/Experience";

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
    path: '/portfolio',
    element: (
      <>
        <Header />
        <Portfolio />
      </>
    )
  },
  {
    path: '/piscines',
    element: (
      <>
        <Header />
        <Pools />
      </>
    )
  },
  {
    path: '/amenagements',
    element: (
      <>
        <Header />
        <Amenagement />
      </>
    )
  },
  {
    path: '/excavations',
    element: (
      <>
        <Header />
        <Excavation />
      </>
    )
  },
  {
    path: '/experience',
    element: (
      <>
        <Header />
        <Experience />
      </>
    )
  },
  {
    path: '/blog',
    element: (
      <>
        <Header />
        <Blog />
      </>
    )
  },
  {
    path: '/contact',
    element: (
      <>
        <Header />
        <Contact />
      </>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
)
