import { useState } from 'react';

import './Menu.css';

import HamburgerMenu from './HamburgerMenu';
import MenuItem from './MenuItem';
import ContactButton from './ContactButton';

const Menu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(prev => !prev);
  }

  const menuTitles = [
    "Pools",
    "Excavation",
    "Bid",
  ]

  return(
    <>
      <HamburgerMenu isopen={isOpen} handlemenuclick={handleMenuClick} />
      <div id="menu" className={isOpen ? "menu-visible" : "menu-invisible"}>
        <nav id="menu-nav">
          {
            menuTitles.map((item, index) => {
              return <MenuItem key={index} title={item.toUpperCase()} handlemenuclick={handleMenuClick} />
            })
          }
        </nav>
        <div id='contact-socials'>
          <ContactButton />
        </div>
      </div>
    </>
  );
}

export default Menu;