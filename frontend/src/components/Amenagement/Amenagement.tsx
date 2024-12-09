import TitleDesc from "../TitleDesc"
import AmenagementBox from "./AmenagementBox";
import {
  FaTree,
  FaPencilRuler,
  FaSeedling,
  FaHome
} from "react-icons/fa";
import { MdOutlineFence, MdOutlineWaterDrop } from "react-icons/md";
import { GiWoodBeam, GiPlanks, GiBrickWall, GiStoneWall, GiWaterFountain, GiBarbecue } from "react-icons/gi";

const Amenagement = () => {
  const tag = 'amenagement';
  const services = [
    {
      name: "Térrassement",
      desc: "Préparation du terrain pour tous vos projets extérieurs.",
      icon: <FaSeedling />
    },
    {
      name: "Pavé-uni",
      desc: "Installation professionnelle de pavés pour vos entrées, trottoirs, et terrasses.",
      icon: <GiBrickWall />
    },
    {
      name: "Services de designer",
      desc: "Conception sur mesure pour un aménagement extérieur unique.",
      icon: <FaPencilRuler />
    },
    {
      name: "Installation de clôture",
      desc: "Pose de clôtures pour sécurité et esthétique.",
      icon: <MdOutlineFence />
    },
    {
      name: "Cuisine extérieure",
      desc: "Création de cuisines extérieures fonctionnelles et modernes.",
      icon: <GiBarbecue />
    },
    {
      name: "Pergola",
      desc: "Installation de pergolas pour des espaces ombragés élégants.",
      icon: <FaHome />
    },
    {
      name: "Plantation",
      desc: "Ajout de plantes et d’arbres pour embellir vos espaces.",
      icon: <FaTree />
    },
    {
      name: "Fontaine d'eau",
      desc: "Installation de fontaines pour une touche relaxante.",
      icon: <GiWaterFountain />
    },
    {
      name: "Terrasse de bois",
      desc: "Conception et installation de terrasses en bois pour accentuer un style naturel.",
      icon: <GiWoodBeam />
    },
    {
      name: "Terrasse en composite",
      desc: "Terrasses durables et modernes en matériaux composites pour moderniser votre cour.",
      icon: <GiPlanks />
    },
    {
      name: "Muret",
      desc: "Construction de murets pour délimiter et structurer vos espaces en style.",
      icon: <GiStoneWall />
    },
    {
      name: "Système d'irrigation",
      desc: "Installation de systèmes d’arrosage efficaces pour vos plates-bandes et pelouse.",
      icon: <MdOutlineWaterDrop />
    },
  ];

  return(
    <div className='amenagement-container'>
      <TitleDesc tag={tag}/>
      <h2 className='amenagement-subtitle'>Notre équipe d'aménagement paysager vous offre une gamme complète de services pour transformer votre espace extérieur en un havre de paix personnalisé</h2>
      {services.map((service, index) => {
        return <AmenagementBox name={service.name} desc={service.desc} icon={service.icon} anim={index%2==0 ? '-side-left' : '-side-right'} key={index} />
      })}
    </div>
  )
}

export default Amenagement;