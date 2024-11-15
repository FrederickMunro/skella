import './PageContainer.css';

interface Props {
  children: React.ReactNode;
}

const PageContainer = ({ children }: Props) => {
  return (
    <div className='page-container'>
      { children }
    </div>
  )
}

export default PageContainer;