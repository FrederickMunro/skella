import { ReactNode } from 'react';

import './MainContainer.css';

interface Props {
  children: ReactNode;
}

const MainContainer = ({ children }: Props) => {
  return(
    <div className='flex-container'>
      {children}
    </div>
  );
}

export default MainContainer;