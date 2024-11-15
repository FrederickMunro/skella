import { Link } from "react-router-dom";


interface Props {
  title: string;
  handlemenuclick: Function;
}

const MenuItem = ({ title, handlemenuclick }: Props) => {
  return(
    <Link
      className='header-menu-item'
      to={title.toLowerCase() === 'home' ? '/' : `/${title.toLowerCase()}`}
      onClick={() => handlemenuclick()}
    >
      {title}
    </Link>
  );
}

export default MenuItem;