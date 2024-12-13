import TitleDesc from "../TitleDesc";
import { PopupButton  } from 'react-calendly';

import './Contact.css';
import { SocialIcon } from "react-social-icons";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import water from '../../assets/images/WHITE-WATER.png';

const Contact = () => {
  const socialsColor = 'white';
  const socialsBgColor = '#00142d';

  return(
    <div className='contact-container'>
      <div className='contact-container-top'>
        <h1 className='header-container-title-contact'>Contactez nous</h1>
        <div className='contact-div'>
          <div className='contact-icon-container'>
            <FaPhone className='contact-icon'/>
          </div>
          <p className='contact-div-text'>Telephone</p>
          <a
            className='contact-link-button'
            target='_blank'
            href='+15147023344'
            rel='noopener noreferrer'
          >
            <p className='contact-text-button'>514-702-3344</p>
          </a>
        </div>

        <div className='contact-div'>
          <div className='contact-icon-container'>
            <FaEnvelope className='contact-icon'/>
          </div>
          <p className='contact-div-text'>Courriel</p>
          <a
            className='contact-link-button'
            target='_blank'
            href='mailto:info@skella.ca'
            rel='noopener noreferrer'
          >
            <p className='contact-text-button'>info@skella.ca</p>
          </a>
        </div>

        <div className='contact-div'>
          <div className='contact-icon-container'>
            <FaMapMarkerAlt className='contact-icon'/>
          </div>
          <p className='contact-div-text'>Addresse</p>
          <a
            className='contact-link-button'
            target='_blank'
            href='https://www.google.com/maps/search/?api=1&query=C.P.+54,+Place+Chambly,+Quebec,+J3L+4B1'
            rel='noopener noreferrer'
          >
            <p className='contact-text-text'>C.P. 54, Place Chambly, Quebec, J3L 4B1</p>
          </a>
        </div>
      </div>

      <div className='header-container-contact'>
        <img className='header-container-contact-img' src={water} />
        <h2 className='contact-header-h2'>Visitez nos reseaux sociaux</h2>
        <div className='contact-socials-c'>
          <SocialIcon
            className='contact-social-c'
            url='https://www.instagram.com/excavations_skella'
            bgColor={socialsBgColor}
            fgColor={socialsColor}
            target="_blank"
            rel="noopener noreferrer" 
          />
          <SocialIcon
            className='contact-social-c'
            url='https://www.facebook.com/profile.php?id=100064180712995'
            bgColor={socialsBgColor}
            fgColor={socialsColor}
            target="_blank"
            rel="noopener noreferrer"
          />
          <SocialIcon
            className='contact-social-c'
            url='https://www.tiktok.com/@excavations_skella'
            bgColor={socialsBgColor}
            fgColor={socialsColor}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
      
      <h3 className='contact-rdv-title'>Vous voulez en apprendre davantage?</h3>
      <div className='calendly-container'>
        <PopupButton
          styles={{
            fontSize: '2rem',
            color: 'white',
            backgroundColor: ''
          }}
          rootElement={document.getElementById("root")!}
          text="Prenez un rendez-vous"
          url={`https://calendly.com/munro-development/rencontre-30-minutes?hide_landing_page_details=1&hide_gdpr_banner=1?locale=fr`}
        />
      </div>
    </div>
  )
}

export default Contact;