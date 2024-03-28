import './Perk.css';

interface Props {
  title: string;
  details: string;
}

const Perk = ({ title, details }: Props) => {
  return(
    <div className='perk'>
      <h3 className='perk-title'>{title}</h3>
      <p className='perk-details'>{details}</p>
    </div>
  );
}

export default Perk;