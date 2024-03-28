import { Link } from 'react-router-dom';

import './Home.css';

import MainContainer from './MainContainer';
import TopImage from '../assets/AQUARINO-pacifique_pacific-5-min.jpg';
import ModelsImage from '../assets/1227-piscine-sel-de-mer.jpg';
import ExcavationImage from '../assets/excavation-montreal-jack-hammer-2.jpg';

const Home = () => {
  
    return(
      <MainContainer>
        <div className='home-container'>
          <img className='home-intro-image' src={TopImage} />
          <p className='home-text home-text-center'>
            Welcome to Excavations Skella, your premier destination for excavation excellence 
            and inground fiberglass pool installations. From breaking ground to creating aquatic 
            havens, we specialize in transforming landscapes into extraordinary retreats. Explore 
            our services and let us sculpt your vision into reality.
          </p>
        </div>
        <div className='home-container home-models-container'>
          <img className='home-models-image' src={ModelsImage} />
          <h3 className='home-title'>Fiberglass Pool Installation</h3>
          <p className='home-text'>
            Our fiberglass home offer exceptional quality and durability, ensuring long-lasting 
            enjoyment for homeowners. With innovative designs and superior craftsmanship, our home 
            provide a stunning addition to any outdoor space.
          </p>
          <Link to='/pools' className='home-models-button'>
            See models
          </Link>
        </div>
        <div className='home-container home-excavation-container'>
          <img className='home-excavation-image' src={ExcavationImage} />
          <h3 className='home-title'>Excavation Services</h3>
          <p className='home-text'>
            We specialize in a wide range of excavation services tailored to your specific needs, 
            including foundation repair, French drain installation, septic tank installation, and 
            pyrite repair. Our pricing is customized for each project, and we prioritize client 
            satisfaction through effective communication and the use of advanced technology.
          </p>
          <Link to='/excavation' className='home-models-button'>
            Explore services
          </Link>
        </div>
      </MainContainer>
  );
}

export default Home;