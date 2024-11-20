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
import Footer from "./components/Footer/Footer";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    )
  },
  {
    path: '/portfolio',
    element: (
      <>
        <Header />
        <Portfolio />
        <Footer />
      </>
    )
  },
  {
    path: '/piscines',
    element: (
      <>
        <Header />
        <Pools />
        <Footer />
      </>
    )
  },
  {
    path: '/amenagements',
    element: (
      <>
        <Header />
        <Amenagement />
        <Footer />
      </>
    )
  },
  {
    path: '/excavations',
    element: (
      <>
        <Header />
        <Excavation />
        <Footer />
      </>
    )
  },
  {
    path: '/experience',
    element: (
      <>
        <Header />
        <Experience />
        <Footer />
      </>
    )
  },
  {
    path: '/blog',
    element: (
      <>
        <Header />
        <Blog />
        <Footer />
      </>
    )
  },
  {
    path: '/contact',
    element: (
      <>
        <Header />
        <Contact />
        <Footer />
      </>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
)
