import './HomeLogo.css';

import Logo from '../assets/small-logo-excavations-skella.png';

const HomeLogo = () => {

  return(
    <button id={ 'home-button'}>
      <img
        id = { 'home-logo' }
        src = { Logo }
        alt = { 'Company logo as home button' }
      />
    </button>
  );
}

export default HomeLogo;