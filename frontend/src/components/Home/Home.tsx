import './Home.css';
import HomeVideo from './HomeVideo';
import HomePools from './HomePools';

const Home = () => {
  return (
    <div className='home-container'>
      <HomeVideo />
      <HomePools />
    </div>
  )
}

export default Home;