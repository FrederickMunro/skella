import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import './Home.css';
import ItemContainer from "../ItemContainer";

interface Props {
  name: string;
  description: string;
  link: string;
  video: string;
}

const ServiceSection = ({ name, description, link, video }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsHovered(false);
  };

  return(
    <ItemContainer>
        <div
          className={`home-service-section home-service-section-${isHovered ? '': 'not'}hovered`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            className='home-service-video'
            ref={videoRef}
            src={video}
            muted
            loop
          />

          <div className='home-service-dark-overlay' />

          <Link
            to={link}
            className='home-service-content'
          >
            <h2 className='home-service-title'>{name.toUpperCase()}</h2>
            <p className='home-service-description'>{description}</p>
            
          </Link>
        </div>
    </ItemContainer>
  );
}

export default ServiceSection;