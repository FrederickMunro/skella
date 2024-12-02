import { useInView } from "react-intersection-observer";
import './PageContainer.css';

interface Props {
    children: React.ReactNode;
}

const ItemContainer = ({ children }: Props) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return(
        <div ref={ref} className={`item-container inview-container ${inView ? "visible" : "hidden"}`}>
            {children}
        </div>
    )
}

export default ItemContainer;