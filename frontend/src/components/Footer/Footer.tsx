import { SocialIcon } from 'react-social-icons';
import { FaPhone, FaEnvelope, FaFax } from 'react-icons/fa';
import rinoxIcon from '../../assets/images/logo-rinoxgroup-fr.png';

import './Footer.css';
import ItemContainer from '../ItemContainer';

const Footer = () => {

    const socialsColor = '#c9def5';

    return(
        <ItemContainer anim='-appear'>
            <div className='footer-container'>
                <div className='footer-container-left'>
                    <h3>Contactez-nous</h3>
                    <div className='footer-contact-div'>
                        <a className='footer-contact-link' href='+15147023344'>
                            <FaPhone className='footer-contact-icon'/>
                            <p>+1 (514) 702-3344</p>
                        </a>
                    </div>
                    {/* <div className='footer-contact-div'>
                        <a className='footer-contact-link'>
                            <FaFax className='footer-contact-icon'/>
                            <p>+1 (450) 447-2950</p>
                        </a>
                    </div> */}
                    <div className='footer-contact-div'>
                        <a className='footer-contact-link' href='mailto:Test@test.ca'>
                            <FaEnvelope className='footer-contact-icon'/>
                            <p>Test@test.ca</p>
                        </a>
                    </div>
                    <div className='contact-socials'>
                        <SocialIcon
                            className='contact-social'
                            url='https://www.instagram.com/excavations_skella'
                            bgColor='transparent'
                            fgColor={socialsColor}
                            target="_blank"
                            rel="noopener noreferrer" 
                        />
                        <SocialIcon
                            className='contact-social'
                            url='https://www.facebook.com/profile.php?id=100064180712995'
                            bgColor='transparent'
                            fgColor={socialsColor}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                        <SocialIcon
                            className='contact-social'
                            url='https://www.tiktok.com/@excavations_skella'
                            bgColor='transparent'
                            fgColor={socialsColor}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    </div>
                </div>
                {/* <div className='footer-container-right'>
                    <a href='https://rinoxgroup.com/' target='_blank'>
                        <img src={rinoxIcon}/>
                    </a>
                    <div>
                        <p>&nbsp;Une division du&nbsp;</p>
                        <p>Groupe Rinox&nbsp;</p>
                    </div>
                </div> */}
            </div>
        </ItemContainer>
    )
}

export default Footer;