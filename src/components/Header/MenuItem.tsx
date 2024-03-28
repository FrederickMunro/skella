import { Link } from 'react-router-dom';

import './Header.css';

interface Props {
  title: string;
  handlemenuclick: Function
}

const MenuItem = ({ title, handlemenuclick }: Props) => {

  return(
    <Link
      to={title.toLowerCase() === 'home' ? '/' : `/${title.toLowerCase()}`}
      className='menu-button'
      onClick={() => handlemenuclick()}
    >
      {title}
    </Link>
  );
}

export default MenuItem;