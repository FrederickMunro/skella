import './PageContainer.css';
import { useInView } from "react-intersection-observer";

interface Props {
    children: React.ReactNode;
}

const ContentContainer = ({ children }: Props) => {
    return(
        <div>
            {children}
        </div>
    )
}

export default ContentContainer;