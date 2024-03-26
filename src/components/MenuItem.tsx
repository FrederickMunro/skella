import { useNavigate } from 'react-router-dom';
import './MenuItem.css';

interface Props {
  title: string;
  handlemenuclick: Function
}

const MenuItem = ({ title, handlemenuclick }: Props) => {

  const navigate = useNavigate();
  const handleNavigation = () => {
    handlemenuclick();
    navigate(`/${title.toLowerCase()}`)
  }

  return(
    <button className='menu-button' onClick={() => handleNavigation()}>
      {title}
    </button>
  );
}

export default MenuItem;