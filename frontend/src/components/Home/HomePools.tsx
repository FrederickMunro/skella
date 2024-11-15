import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import HomePoolContainer from "../Pools/HomePoolContainer.tsx";
import axios from "axios";

interface Pool {
  id: number;
  name: string;
  image: string;
}

const HomePools = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;

  const [pools, setPools] = useState<Pool[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const fetchPools = async () => {
    try {
      const response = await axios.get<Pool[]>(`${apiUrl}/allpools`);
      setPools(response.data);
    } catch (error) {
      console.error('Error fetching pools:', error);
    }
  };

  useEffect(() => {
    fetchPools();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, pools.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pools.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pools.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const scrollPosition = currentIndex * (cardWidth + 20); // 20 is the gap between cards
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return(
    <div className="home-pools-container">
      <h2 className="home-pools-title">Our Pools</h2>
      <Link className="home-pools-link" to='/pools'>See full collection</Link>
      <div className="home-pools-carousel">
        <button onClick={handlePrev} className="nav-button prev">
          ←
        </button>
        
        <div className="pools-scroll" ref={scrollContainerRef}>
          {pools.map((pool) => (
            <HomePoolContainer key={pool.id} name={pool.name} image={pool.image} />
          ))}
        </div>

        <button onClick={handleNext} className="nav-button next">
          →
        </button>
      </div>
    </div>
  );
}

export default HomePools;