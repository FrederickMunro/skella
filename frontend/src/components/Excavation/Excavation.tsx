import TitleDesc from "../TitleDesc";
import Machine from "./Machine";

import './Excavations.css';

const Excavation = () => {
  const tag = 'excavations';

  const tags = [
    'excavations-mini',
    'excavations-moyenne',
    'excavations-hydro',
    'excavations-transport'
  ];

  return(
    <div className='excavation-container'>
      <TitleDesc tag={tag} />
      {tags.map((tag, index) => {
        return <Machine key={index} tag={tag}/>
      })}
    </div>
  )
}

export default Excavation;