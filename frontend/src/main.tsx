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
import Altea from "./components/Pools/Altea";
import Evoa from "./components/Pools/Evoa";
import Fluvia from "./components/Pools/Fluvia";
import Collections from "./components/Pools/Collections";
import Soumission from "./components/Soumission/Soumission";

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
        <Collections />
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
  },
  {
    path: '/soumission',
    element: (
      <>
        <Header />
        <Soumission />
        <Footer />
      </>
    )
  },
  {
    path: '/collections',
    element: (
      <>
        <Header />
        <Collections />
        <Footer />
      </>
    )
  },
  {
    path: '/altea',
    element: (
      <>
        <Header />
        <Altea />
        <Footer />
      </>
    )
  },
  {
    path: '/evoa',
    element: (
      <>
        <Header />
        <Evoa />
        <Footer />
      </>
    )
  },
  {
    path: '/fluvia',
    element: (
      <>
        <Header />
        <Fluvia />
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
