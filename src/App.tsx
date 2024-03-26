import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Header from './components/Header';
import Pools from './components/Pools';
import Excavation from './components/Excavation';

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route
          path="/skella/*"
          element={<Navigate to='/' />}
          />
        <Route path='/' element={ <Home /> } />
        <Route path='/pools' element={ <Pools /> } />
        <Route path='/excavation' element={ <Excavation /> } />
      </Routes>
    </Router>
    </>
  );
}

export default App
