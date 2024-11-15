import { useState } from 'react';

import './Header.css';

import Hamburger from './Hamburger';
import MenuItem from './MenuItem';

const Menu = () => {
  const [menuState, setMenuState] = useState('header-menu-closed');

  const handleMenuClick = () => {
    if (menuState === 'header-menu-closed') {
      setMenuState('header-menu-open');
    } else {
      setMenuState('header-menu-closed');
    }
  }

  const menuTitles = [
    'Home',
    'Pools',
    'Excavation',
    'Estimate',
  ]

  return(
    <>
      <Hamburger menuState={menuState} handleMenuClick={handleMenuClick} />
      <div className={`header-menu ${menuState}-slider main-color-background`}>
        <nav className='header-menu-nav'>
          {
            menuTitles.map((item, index) => {
              return <MenuItem key={index} title={item.toUpperCase()} handlemenuclick={handleMenuClick} />
            })
          }
        </nav>
        {/* <div className='contact-socials'>
          
          <SocialMedia fgColor='black' bgColor='transparent'/>
          <ContactButton />
        </div> */}
      </div>
    </>
  );
}

export default Menu;