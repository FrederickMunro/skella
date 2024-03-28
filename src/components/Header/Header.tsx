import './Header.css';

import Menu from "./Menu";
import HomeLogo from "./HomeLogo";

const Header = () => {
  return(
    <div className='header'>
      <div className='header-content'>
        <HomeLogo />
        <Menu />
      </div>
    </div>
  );
}

export default Header;