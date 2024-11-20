import './PageContainer.css';

interface Props {
    children: React.ReactNode;
}

const ContentContainer = ({ children }: Props) => {
    return(
        <div className='content-container'>
            {children}
        </div>
    )
}

export default ContentContainer;