import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Header from './components/Header';

function App() {

  return (
    <>
    <Header />
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App
