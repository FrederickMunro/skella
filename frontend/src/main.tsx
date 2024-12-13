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
import LogoAnimation from "./components/LogoAnimation";
import BackToTop from "./components/BackToTop";
import Promotions from "./components/Promotion/Promotions";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
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
        <BackToTop />
        <Header />
        <Fluvia />
        <Footer />
      </>
    )
  },
  {
    path: '/promotions',
    element: (
      <>
        <BackToTop />
        <Header />
        <Promotions />
        <Footer />
      </>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <>
    <LogoAnimation />
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </>
)
