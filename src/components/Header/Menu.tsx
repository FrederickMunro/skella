import { useState } from 'react';

import './Header.css';

import HamburgerMenu from './HamburgerMenu';
import MenuItem from './MenuItem';
import ContactButton from './ContactButton';
import SocialMedia from '../SocialMedia';

const Menu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(prev => !prev);
  }

  const menuTitles = [
    'Home',
    'Pools',
    'Excavation',
    'Estimate',
  ]

  return(
    <>
      <HamburgerMenu isopen={isOpen} handlemenuclick={handleMenuClick} />
      <div className={`menu ${isOpen ? 'menu-visible' : 'menu-invisible'}`}>
        <nav className='menu-nav'>
          {
            menuTitles.map((item, index) => {
              return <MenuItem key={index} title={item.toUpperCase()} handlemenuclick={handleMenuClick} />
            })
          }
        </nav>
        <div className='contact-socials'>
          <SocialMedia fgColor='black' bgColor='transparent'/>
          <ContactButton />
        </div>
      </div>
    </>
  );
}

export default Menu;