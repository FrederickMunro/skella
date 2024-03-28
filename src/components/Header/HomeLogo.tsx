import { Link } from 'react-router-dom';

import './Header.css';

import Logo from '../../assets/logo-excavations-skella.png';

const HomeLogo = () => {

  return(
    <Link to='/' className='home-button'>
      <img className='home-logo' src={Logo} alt='Company logo as home button' />
    </Link>
  );
}

export default HomeLogo;