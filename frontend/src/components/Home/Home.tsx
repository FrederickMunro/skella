import './Home.css';
import HomeVideo from './HomeVideo';
import HomePools from './HomePools';
import ServiceSection from './ServiceSection';
import videopiscines from '../../assets/videos/homepage_video.mp4';
import videoamenagements from '../../assets/videos/amenagements.mp4';
import videoexcavations from '../../assets/videos/excavations.mp4';
import SectionDesc from './SectionDesc';

const Home = () => {
  return (
    <div className='home-container'>
      <HomeVideo />
      {/* <h2>Un service impeccable</h2>
      <p>Groupe Skella vous offre des services cles en main d'installations de piscines, d'amenagement paysager, et d'excavations.</p> */}
      <div className='home-section'>
        <SectionDesc tag='piscines-sec' />
        <ServiceSection name='Piscines' description='Decouvrez nos collections' link='/piscines' video={videopiscines} />
        <ServiceSection name='Amenagements' description='Voir nos projets' link='./amenagements' video={videoamenagements} />
        <ServiceSection name='Excavations' description='Voir nos projets' link='./excavations' video={videoexcavations} />
      </div>
      <div className='home-section'>
        <SectionDesc tag='experience-sec' />
      </div>
    </div>
  )
}

export default Home;