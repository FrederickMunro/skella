import { useState } from 'react';

import './Header.css';

interface Props {
  menuState: string;
  handleMenuClick: Function;
}

const Hamburger = ({ menuState, handleMenuClick }: Props) => {
  
  return (
    <>
    <div className={`header-hamburger-menu ${menuState}`} onClick={() => handleMenuClick()}>
      <svg width="60" height="60" viewBox="0 0 100 100">
        <path className="header-hamburger-line header-hamburger-top" d="M 20,30 H 80"/>
        <path className="header-hamburger-line header-hamburger-middle" d="M 20,50 H 80" />
        <path className="header-hamburger-line header-hamburger-bottom" d="M 20,70 H 80"/>
      </svg>
    </div>
    </>
  )
}

export default Hamburger;