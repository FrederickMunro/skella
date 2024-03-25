import { useState } from 'react';

import './Menu.css';

import HamburgerMenu from './HamburgerMenu';
import MenuItem from './MenuItem';

const Menu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(prev => !prev);
  }

  return(
    <>
      <HamburgerMenu isopen={isOpen} handlemenuclick={handleMenuClick} />
      <div id="menu" className={isOpen ? "menu-visible" : "menu-invisible"}>
      </div>
      <MenuItem />
    </>
  );
}

export default Menu;