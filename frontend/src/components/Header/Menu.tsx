import { useState } from 'react';

import './Header.css';

import Hamburger from './Hamburger';
import MenuItem from './MenuItem';

interface Props {
  menustate: string;
  menuclick: Function;
}

const Menu = ({ menustate, menuclick}: Props) => {

  const menuItems = [
    {
      title: 'Piscines',
      url: '/piscines',
      items: [
        {
          title: 'Collections',
          url: '/collections'
        },
        {
          title: 'Altea',
          url: '/altea'
        },
        {
          title: 'Evoa',
          url: '/evoa'
        },
        {
          title: 'Fluvia',
          url: '/fluvia'
        }
      ]
    },
    {
      title: 'Aménagements',
      url: '/amenagements',
      items: null
    },
    {
      title: 'Excavation',
      url: '/excavations',
      items: null
    },
    // {
    //   title: 'Portfolio',
    //   url: '/portfolio',
    //   items: null
    // },
    {
      title: 'L\'Expérience Skella',
      url: '/experience',
      items: null
    },
    {
      title: 'Blog',
      url: '/blog',
      items: null
    },
    {
      title: 'Contact',
      url: '/contact',
      items: null
    },
  ]

  return(
    <>
      <Hamburger menuState={menustate} handleMenuClick={menuclick} />
      <div className={`header-menu ${menustate}-slider main-color-background`}>
        <nav className='header-menu-nav'>
          {
            menuItems.map((item, index) => {
              return <MenuItem key={index} title={item.title} url={item.url} items={item.items} handlemenuclick={menuclick} />
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