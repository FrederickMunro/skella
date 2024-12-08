import './Home.css';
import HomeVideo from './HomeVideo';
import ServiceSection from './ServiceSection';
import videopiscines from '../../assets/videos/homepage_video.mp4';
import videoamenagements from '../../assets/videos/amenagements.mp4';
import videoexcavations from '../../assets/videos/excavations.mp4';
import SectionDesc from './SectionDesc';
import Reviews from './Reviews';
import ItemContainer from '../ItemContainer';
import StatsBox from './StatsBox';
import pic from '../../assets/images/AQUARINO gris arctique_arctic grey-6.jpg';

const Home = () => {
  return (
    <div>
      <HomeVideo />
      <div className='home-section'>
        <SectionDesc tag='piscines-sec' className='background-sand-to-blue' />
        <ServiceSection name='Piscines' description='Plongez dans nos collections' link='/collections' video={videopiscines} />
        <ServiceSection name='Amenagements' description='Inspirez-vous' link='./amenagements' video={videoamenagements} />
        <ServiceSection name='Excavations' description='Voir nos projets' link='./excavations' video={videoexcavations} />
      </div>
      <div className='home-section'>
        <SectionDesc tag='experience-sec' className='background-sand-to-white'/>
      </div>
      <div className=''>
        <Reviews />
      </div>
      <ItemContainer>
        <div className='stats-section'>
          <img src={pic} className='stat-pic' />
          <StatsBox />
        </div>
      </ItemContainer>
    </div>
  )
}

export default Home;