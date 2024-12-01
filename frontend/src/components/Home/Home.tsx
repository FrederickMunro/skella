import './Home.css';
import HomeVideo from './HomeVideo';
import ServiceSection from './ServiceSection';
import videopiscines from '../../assets/videos/homepage_video.mp4';
import videoamenagements from '../../assets/videos/amenagements.mp4';
import videoexcavations from '../../assets/videos/excavations.mp4';
import SectionDesc from './SectionDesc';

const Home = () => {
  return (
    <div className='home-container'>
      <HomeVideo />
      <div className='home-section'>
        <SectionDesc tag='piscines-sec' className='background-left-right' />
        <ServiceSection name='Piscines' description='Plongez dans nos collections' link='/collections' video={videopiscines} />
        <ServiceSection name='Amenagements' description='Inspirez-vous' link='./amenagements' video={videoamenagements} />
        <ServiceSection name='Excavations' description='Voir nos projets' link='./excavations' video={videoexcavations} />
      </div>
      <div className='home-section'>
        <SectionDesc tag='experience-sec' />
      </div>
    </div>
  )
}

export default Home;