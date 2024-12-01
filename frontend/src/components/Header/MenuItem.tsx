import { useState } from "react";
import { Link } from "react-router-dom";


interface Props {
  title: string;
  url: string;
  items: MenuItemType[] | null;
  handlemenuclick: Function;
}

interface MenuItemType {
  title: string;
  url: string;
}

const MenuItem = ({ title, url, items, handlemenuclick }: Props) => {
  const [menuState, setMenuState] = useState('closed');

  const handleItemsClick = () => {
    if (menuState === 'closed') {
      setMenuState('open');
    } else {
      setMenuState('closed');
    }
  }

  return (
    <>
      {
        items ? (
          <div>
            <div className='header-menu-dropdown-link'>
              <Link
                to={url}
                className='header-menu-item split-dropdown'
                onClick={() => handlemenuclick()}
              >
                {title}
              </Link>
              <button onClick={() => handleItemsClick()} className={`dropdown-toggle ${menuState === 'open' ? 'rotated' : ''}`} aria-expanded="false">
                ►
              </button> 
            </div>
            <div className={`header-menu-items-container menu-items-${menuState}`}>
              {
                items.map((item: MenuItemType, index) => (
                  <Link
                    key={index}
                    className='header-menu-item'
                    to={item.url}
                    onClick={() => handlemenuclick()}
                  >
                    {item.title}
                  </Link>
                ))
              }
            </div>
          </div>
        ) : (
          <Link
            className='header-menu-item'
            to={url}
            onClick={() => handlemenuclick()}
          >
            {title}
          </Link>
        )
      }
    </>
  );
}

export default MenuItem;