import { SocialIcon } from 'react-social-icons';

import './SocialMedia.css';

interface Props {
  fgColor: string
  bgColor: string;
}

const SocialMedia = ({ fgColor, bgColor }: Props) => {

  const socials = [
    { network: 'instagram', url: 'https://www.instagram.com/excavations_skella/' },
    { network: 'facebook', url: 'https://www.facebook.com/profile.php?id=100064180712995' },
  ]

  return(
    <div className='socials'>
      {
        socials.map((social, index) => {
          return(
            <SocialIcon
              url={social.url}
              network={social.network}
              target='_blank'
              fgColor={fgColor}
              bgColor={bgColor}
              key={index}
            />
          )
        })
      }
    </div>
  );
};

export default SocialMedia;