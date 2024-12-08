import TitleDesc from "../TitleDesc"
import AmenagementBox from "./AmenagementBox";
import {
  FaTree,
  FaPencilRuler,
  FaSeedling,
  FaHome
} from "react-icons/fa";
import { MdOutlineFence, MdOutlineWaterDrop, MdOutlineDeck } from "react-icons/md";
import { GiWoodBeam, GiPlanks, GiBrickWall, GiStoneWall, GiWaterFountain, GiBarbecue } from "react-icons/gi";

const Amenagement = () => {
  const tag = 'amenagement';
  const services = [
    { name: "Térrassement", icon: <FaSeedling /> },
    { name: "Pavé-uni", icon: <GiBrickWall /> },
    { name: "Services de designer", icon: <FaPencilRuler /> },
    { name: "Installation de clôture", icon: <MdOutlineFence /> },
    { name: "Cuisine extérieure", icon: <GiBarbecue /> },
    { name: "Pergola", icon: <FaHome /> },
    { name: "Plantation", icon: <FaTree /> },
    { name: "Fontaine d'eau", icon: <GiWaterFountain /> },
    { name: "Terrasse de bois", icon: <GiWoodBeam /> },
    { name: "Terrasse en composite", icon: <GiPlanks /> },
    { name: "Muret", icon: <GiStoneWall /> },
    { name: "Système d'irrigation", icon: <MdOutlineWaterDrop /> },
  ];
  return(
    <div className='amenagement-container'>
      <TitleDesc tag={tag}/>
      <h2 className='amenagement-subtitle'>Notre équipe d'aménagement paysager vous offre une gamme complète de services pour transformer votre espace extérieur en un havre de paix personnalisé</h2>
      {services.map((service, index) => {
        return <AmenagementBox name={service.name} icon={service.icon} anim={index%2==0 ? '-side-left' : '-side-right'} key={index} />
      })}
    </div>
  )
}

export default Amenagement;