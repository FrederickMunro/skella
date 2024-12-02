import './PageContainer.css';
import { useInView } from "react-intersection-observer";

interface Props {
    children: React.ReactNode;
}

const ContentContainer = ({ children }: Props) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    return(
        <div ref={ref} className={`content-container inview-container ${inView ? "visible" : "hidden"}`}>
            {children}
        </div>
    )
}

export default ContentContainer;