import EditableComponent from "../Edit/EditableComponent";
import SectionDesc from "../Home/SectionDesc";
import TitleDesc from "../TitleDesc";


const Collections = () => {
    const tag = 'piscines-collections'

    return (
        <>
            <TitleDesc tag={tag} />
            <SectionDesc tag={tag + '-altea'} />
        </>
    );
}

export default Collections;