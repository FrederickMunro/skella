import { Link } from 'react-router-dom';

import './Header.css';

import CompanyLogo from '../../assets/logo-excavations-skella-large.png';
import Menu from './Menu';
import { useState } from 'react';

const Header = () => {
  const [menuState, setMenuState] = useState('header-menu-closed');

  const handleMenuClick = () => {
    if (menuState === 'header-menu-closed') {
      setMenuState('header-menu-open');
    } else {
      setMenuState('header-menu-closed');
    }
  }

  const handleHomeClick = () => {
    if (menuState === 'header-menu-open') {
      setMenuState('header-menu-closed');
    }
  }

  return (
    <div className='header-container main-color-background'>
      <Link
        to='/'
        onClick={() => handleHomeClick()}
        className='header-home-logo-container'
      >
        <img className='header-home-logo' src={CompanyLogo} alt='Company Logo' />
      </Link>
      <Menu menustate={menuState} menuclick={handleMenuClick} />
    </div>
  )
}

export default Header;