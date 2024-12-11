import { useState } from 'react';
import ItemContainer from '../ItemContainer';
import './Amenagement.css';

interface Props {
  name: string;
  desc: string;
  icon: JSX.Element;
  anim: string;
}

const AmenagementBox = ({ name, desc, icon, anim }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClicked = () => {
    setIsClicked(true);
  }
  
  return(
    <ItemContainer anim='-appear'>
      <div className='amenagement-item'>
        <div className='amenagement-seperator' />
        <ItemContainer anim={anim} threshhold={0.025}>
          <div onClick={() => handleClicked()} className='amenagement-info'>
            <div className='amenagement-icon'>{icon}</div>
            <h2 className={`amenagement-title ${isClicked && 'visible'}`}>{name}</h2>
            <p className={`amenagement-desc ${isClicked && 'visible'}`}>{desc}</p>
          </div>
        </ItemContainer>
      </div>
    </ItemContainer>
  )
}

export default AmenagementBox;