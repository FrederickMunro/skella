import './Header.css';

import Hamburger from '../../assets/burger-menu.svg'
import X from '../../assets/x.svg'

interface Props {
  isopen: boolean;
  handlemenuclick: Function;
}

const HamburgerMenu = ({isopen, handlemenuclick }: Props) => {

  return(
    <button className='hamburger-menu-button' onClick={() => handlemenuclick()} >
      <img className='hamburger-menu-icon' src={isopen ? X : Hamburger} />
    </button>
  );
}

export default HamburgerMenu;