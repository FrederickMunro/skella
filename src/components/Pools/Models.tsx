import DiamondModel from '../../assets/pool-models/aquarino-diamant.png';
import TopazeModel from '../../assets/pool-models/aquarino-topaze.png';
import LazuliModel from '../../assets/pool-models/aquarino-lazuli.png';
import LarimarModel from '../../assets/pool-models/aquarino-larimar.png';
import PerlaModel from '../../assets/pool-models/aquarino-perla.png';
import OpalModel from '../../assets/pool-models/aquarino-opal.png';

import TopImage from '../../assets/AQUARINO-sel-de-mer_sea-salt-2-min.jpg';

import Diamond810 from '../../assets/blueprints/diamond-8-10.pdf';

import Topaze814 from '../../assets/blueprints/topaze-8-14.pdf';
import Topaze1220 from '../../assets/blueprints/topaze-12-20.pdf';
import Topaze1224 from '../../assets/blueprints/topaze-12-24.pdf';
import Topaze1226 from '../../assets/blueprints/topaze-12-26.pdf';

import Lazuli1228 from '../../assets/blueprints/lazuli-12-28.pdf';
import Lazuli1232 from '../../assets/blueprints/lazuli-12-32.pdf';

import Larimar1025 from '../../assets/blueprints/larimar-10-25.pdf';

import Perla1224 from '../../assets/blueprints/perla-12-24.pdf';

import Opal816 from '../../assets/blueprints/opal-8-16.pdf';
import Opal1220 from '../../assets/blueprints/opal-12-20.pdf';

import Model from './Model';

const Models = () => {

  const models = [
    {
      title: 'Diamond',
      description: 'The Diamond model is perfect for limited outdoor spaces. This ' +
                   'model consists of a size of 8 by 10 feet, which is equivalent ' +
                   'to the size of a standard hot tub. It offers a shallow relaxation ' +
                   'area at the entrance of the pool, perfect for the whole family to enjoy.',
      image: DiamondModel,
      sizes: ['8\' x 10\''],
      blueprints: [Diamond810],
      depth: '3\' 9\"'
    },
    {
      title: 'Topaze',
      description: 'The Topaze model is ideal for swimming lovers. This classic ' +
                   'rectangular model is synonymous with perfection for long swims ' +
                   'in the sun and its large steps.',
      image: TopazeModel,
      sizes: ['8\' x 14\'', '12\' x 20\'', '12\' x 24\'', '12\' x 26\''],
      blueprints: [Topaze814, Topaze1220, Topaze1224, Topaze1226],
      depth: '4\' 10\"'
    },
    {
      title: 'Lazuli',
      description: 'The Lazuli model is a favorite among homeowners who like to ' +
                   'entertain during the summer season with the lounge area. Its ' +
                   'entrance area, specially designed as a spa, allows several people ' + 
                   'to sit and enjoy the sun in comfort.',
      image: LazuliModel,
      sizes: ['12\' x 28\'', '12\' x 32\''],
      blueprints: [Lazuli1228, Lazuli1232],
      depth: '4\' 10\"'
    },
    {
      title: 'Larimar',
      description: 'Perfect for children, the Larimar model is ideal for families. ' + 
                   'It represents the perfect balance between safety and fun. The ' +
                   'shallow area at the entrance of the pool is very practical and pleasant.',
      image: LarimarModel,
      sizes: ['10\' x 25\''],
      blueprints: [Larimar1025],
      depth: '4\' 6\"'
    },
    {
      title: 'Perla',
      description: 'The Perla model stands out for its unique beach area. You\'ll ' +
                   'be able to fully enjoy the flat zone while having convenient ' +
                   'access to the stairs leading to the pool, ensuring a relaxing ' +
                   'and enjoyable experience for everyone.',
      image: PerlaModel,
      sizes: ['12\' x 24\''],
      blueprints: [Perla1224],
      depth: '4\' 10\"'
    },
    {
      title: 'Opal',
      description: 'With its short beach area, the Opal model is ideal for families. ' +
                   'Its pool sizes allow you to make the most of your backyard while ' +
                   'maintaining livable space around it.',
      image: OpalModel,
      sizes: ['8\' x 16\'', '12\' x 20\''],
      blueprints: [Opal816, Opal1220],
      depth: '4\' 9\"'
    },
  ]

  return(
    <div className='pool-box grey'>
      <div className='pool-container'>
        <h2 className='pool-top-image-title'>MODELS</h2>
        <img className='pool-top-image' src={TopImage} />
      </div>
      {
        models.map((model, index) => {
          return <Model
              title={model.title}
              description={model.description}
              image={model.image}
              sizes={model.sizes}
              blueprints={model.blueprints}
              depth={model.depth}
              key={index}
            />
        })
      }
    </div>
  );
}

export default Models;