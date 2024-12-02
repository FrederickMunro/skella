import EditableComponent from "../Edit/EditableComponent";
import SectionDesc from "../Home/SectionDesc";
import ServiceSection from "../Home/ServiceSection";
import TitleDesc from "../TitleDesc";

import video from '../../assets/videos/poolvid1.mp4';
import Colors from "./Colors";


const Collections = () => {
    const tag = 'piscines-collections'

    return (
        <div className='collections-container'>
            <TitleDesc tag={tag} />
            <Colors />
            <ServiceSection name='Collection Altea' description='Plongez dans nos collections' link='/altea' video={video} />
            <ServiceSection name='Collection Evoa' description='Inspirez-vous' link='/evoa' video={video} />
            <ServiceSection name='Collection Fluvia' description='Voir nos projets' link='/fluvia' video={video} />
        </div>
    );
}

export default Collections;