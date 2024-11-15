import { Link } from 'react-router-dom';

import './Header.css';

import CompanyLogo from '../../assets/logo-excavations-skella-large.png';
import Menu from './Menu';

const Header = () => {
  return (
    <div className='header-container main-color-background'>
      <Link to='/'>
        <img className='header-home-logo' src={CompanyLogo} alt='Company Logo' />
      </Link>
      <Menu />
    </div>
  )
}

export default Header;