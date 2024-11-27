import { SocialIcon } from 'react-social-icons';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

import './Footer.css';

const Footer = () => {

    const socialsColor = 'black';

    return(
        <div className='footer-container'>
            <div className='footer-container-left'>
                <h3>Contactez-nous</h3>
                <div className='footer-contact-div'>
                    <a className='footer-contact-link' href='+15141111111'>
                        <FaPhone className='footer-contact-icon'/>
                        <p>+1 (515) 111-1111</p>
                    </a>
                </div>
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
            <div>
                <p>A division of groupe Rinox</p>
            </div>
        </div>
    )
}

export default Footer;