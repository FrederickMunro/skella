import './Home.css';
import Video from '../../assets/videos/hockey.mp4';

const HomeVideo = () => {
  return (
    <div className='home-video-container'>
      <video className='home-video' autoPlay loop muted>
        <source src={Video} type='video/mp4' />
        Your browser does not support video.
      </video>
      <div className='home-video-text-container'>
        <h1 className='home-video-title'>GROUPE SKELLA</h1>
        <h2 className='home-video-subtitle'>Fiberglass Pool Services & Excavation</h2>
        <div className='home-date-container'>
          <div className='home-date-line' />
          <p className='home-date-text'>Since 1997</p>
        </div>
      </div>
    </div>
  )
}

export default HomeVideo;