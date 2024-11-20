import { useState } from 'react';
import './Pools.css';
import EditableComponent from '../EditableComponent';

interface Pool {
  id: string;
  poolname: string;
  description: string;
  sizes: string[];
  depths: string[];
  image: string;
  handleEdit: () => void;
}

const PoolContainer = ({id, poolname, description, sizes, depths, image, handleEdit}: Pool) => {

  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  return (
    <div className='pools-pool-info-container'>
      <EditableComponent
        handleEdit={handleEdit}
      >
        <div className='pools-pool-nested-info-container'>
          <h2 className='pools-container-title'>{poolname}</h2>
          <img
            src={typeof image === 'string' ? image : ''} 
            alt={poolname}
            className="pools-pool-image"
          />
          <p className='pools-container-desc'>{description}</p>
          <div className='pools-container-lists'>
            <div className='pools-list'>
              <p className='pools-container-sizes'>
                { sizes.length > 1 ? 'Sizes' : 'Size' }
              </p>
              <ul className='pools-list-list'>
                {
                  sizes.map((size, index) => (
                    <li key={index}>{size}</li>
                  ))
                }
              </ul>
            </div>
            <div className='pools-list'>
              <p className='pools-container-sizes'>
                { depths.length > 1 ? 'Depths' : 'Depth' } 
              </p>
              <ul className='pools-list-list'>
                {
                  depths.map((depth, index) => (
                    <li key={index}>{depth}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </EditableComponent>
    </div>
  )
}

export default PoolContainer