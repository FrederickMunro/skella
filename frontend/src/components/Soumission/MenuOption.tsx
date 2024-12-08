import './Soumission.css';

interface Props {
  title: string;
}

const MenuOption = ({ title }: Props) => {
  return(
    <label className='check-label'>
      <input  className='check-input' type="checkbox" value={1} />
      {title}
    </label>
  );
}

export default MenuOption;