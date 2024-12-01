import TitleDesc from "../TitleDesc";
import { InlineWidget } from 'react-calendly';

import './Contact.css';

const Contact = () => {
  const language = 'fr';

  return(
    <div className='contact-container'>
      <TitleDesc tag='contact'/>
      <div className='calendly-container'>
        <InlineWidget
          styles={{ height: '84rem' }}
          url={`https://calendly.com/munro-development/rencontre-30-minutes?hide_landing_page_details=1&hide_gdpr_banner=1?locale=fr`}
        />
      </div>
    </div>
  )
}

export default Contact;