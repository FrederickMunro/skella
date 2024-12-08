import { useInView } from "react-intersection-observer";
import './PageContainer.css';
import { createContext } from "react";

interface Props {
    children: React.ReactNode;
    anim?: string;
    threshhold?: number;
}

export const InViewContext = createContext<boolean>(false);

const ItemContainer = ({ children, anim, threshhold }: Props) => {
    if (!anim) {
        anim = '';
    }
    const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';
    const { ref, inView } = useInView({
        threshold: threshhold ? threshhold : 0.1,
        triggerOnce: true,
    });

    return(
        <>
            {!isAdmin ? (
                <InViewContext.Provider value={inView}>
                    <div ref={ref} className={`inview-container${anim} ${inView ? `visible${anim}` : `hidden${anim}`}`}>
                        {children}
                    </div>
                </InViewContext.Provider>
            ) : (
                <div>
                    {children}
                </div>
            )}
        </>
    );
}

export default ItemContainer;