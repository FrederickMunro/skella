import { Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Header from './components/Header/Header';
import Excavation from './components/Excavation/Excavation';
import Footer from './components/Footer';
import Pools from './components/Pools/Pools';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/excavation' element={ <Excavation /> } />
        <Route path='/pools' element={ <Pools /> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App
