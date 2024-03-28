import './Footer.css';

import PDF from '../assets/terms-and-conditions-skella-aquarino.pdf';
import SocialMedia from './SocialMedia';

const Footer = () => {

  const openPDF = () => {
    window.open(PDF, '_blank');
  }

  return(
    <div id='footer'>
      <h2 id='footer-title'>Follow us on social media!</h2>
      <SocialMedia fgColor='white' bgColor='transparent' />
      <button className='footer-button' onClick={() => openPDF()}>
        Terms and conditions for pool installation
      </button>
    </div>
  )
}

export default Footer;