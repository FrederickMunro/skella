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
          <div onClick={() => handleItemsClick()}>
            <a className='header-menu-item'>
              {title}
              <span className={`arrow-icon ${menuState === 'open' ? 'arrow-open' : 'arrow-closed'}`}></span>
            </a>
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