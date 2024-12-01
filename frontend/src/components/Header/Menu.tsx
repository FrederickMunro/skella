import { useState } from 'react';

import './Header.css';

import Hamburger from './Hamburger';
import MenuItem from './MenuItem';
import { FcPositiveDynamic } from 'react-icons/fc';

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
          title: 'Collection Altea',
          url: '/altea'
        },
        {
          title: 'Collection Evoa',
          url: '/evoa'
        },
        {
          title: 'Collection Fluvia',
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
      title: 'Soumission',
      url: '/soumission',
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
      </div>
    </>
  );
}

export default Menu;