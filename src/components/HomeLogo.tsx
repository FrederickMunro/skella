import { useNavigate } from 'react-router-dom';

import './HomeLogo.css';

import Logo from '../assets/small-logo-excavations-skella.png';

const HomeLogo = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }

  return(
    <button id={ 'home-button'} onClick={() => handleClick()}>
      <img
        id = { 'home-logo' }
        src = { Logo }
        alt = { 'Company logo as home button' }
      />
    </button>
  );
}

export default HomeLogo;