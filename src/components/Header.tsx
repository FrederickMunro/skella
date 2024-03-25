import './Header.css';

import Menu from "./Menu";
import HomeLogo from "./HomeLogo";

const Header = () => {
  return(
    <div id='header'>
      <HomeLogo />
      <Menu />
    </div>
  );
}

export default Header;