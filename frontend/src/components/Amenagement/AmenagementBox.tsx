import ItemContainer from '../ItemContainer';
import './Amenagement.css';

interface Props {
  name: string;
  icon: JSX.Element;
  anim: string;
}

const AmenagementBox = ({ name, icon, anim }: Props) => {
  return(
    <ItemContainer anim='-appear'>
      <div className='amenagement-item'>
        <div className='amenagement-seperator' />
        <ItemContainer anim={anim} threshhold={0.05}>
          <div className='amenagement-info'>
            <div className='amenagement-icon'>{icon}</div>
            <h2 className='amenagement-title'>{name}</h2>
          </div>
        </ItemContainer>
      </div>
    </ItemContainer>
  )
}

export default AmenagementBox;