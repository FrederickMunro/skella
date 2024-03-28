import './Pools.css';

import SeaSalt from '../../assets/pool-colors/sel-de-mer.png';
import ArcticGrey from '../../assets/pool-colors/gris-arctique.png';
import Aqua from '../../assets/pool-colors/aqua.png';
import Ocean from '../../assets/pool-colors/ocean.png';
import Pacific from '../../assets/pool-colors/pacifique.png';
import Galaxy from '../../assets/pool-colors/galaxie.png';
import ColorImage from '../../assets/piscine-fibre-de-verre-installation.jpg';

const Colors = () => {

  const colors = [
    {
      color: SeaSalt,
      title: 'Sea Salt',
    },
    {
      color: ArcticGrey,
      title: 'Arctic Grey',
    },
    {
      color: Aqua,
      title: 'Aqua',
    },
    {
      color: Ocean,
      title: 'Ocean',
    },
    {
      color: Pacific,
      title: 'Pacific',
    },
    {
      color: Galaxy,
      title: 'Galaxy',
    }
  ]

  return(
    <div className="color-container">
      <div className='pool-container'>
        <h2 className='pool-top-image-title'>COLORS</h2>
        <img className='pool-top-image-colors' src={ColorImage} />
      </div>
      {
        colors.map((color, index) => {
          return (
            <div className='color-box' key={index}>
              <img className='color-image' src={color.color} />
              <h4 className='color-title'>{color.title}</h4>
            </div>
          )
        })
      }
    </div>
  );
}

export default Colors;