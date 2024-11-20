import { useState } from 'react';
import './Pools.css';
import EditableComponent from '../Edit/EditableComponent';
import { Item } from '../Edit/EditModal';

interface Props {
  pool: Pool;
}

interface Pool {
  id: string;
  name: string;
  description: string;
  sizes: string[];
  depths: string[];
  image: string;
}

const PoolContainer = ({ pool }: Props) => {

  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [thisPool, setThisPool] = useState<Pool>(pool)

  const item: Item[] = [
    {
      label: 'Name',
      type: 'input',
      placeholder: '',
      value: thisPool.name,
      setValue: (name: string) => setThisPool(prev => ({ ...prev, name }))
    },
    {
      label: 'Description',
      type: 'input',
      placeholder: '',
      value: thisPool.name,
      setValue: (description: string) => setThisPool(prev => ({ ...prev, description }))
    },
    {
      label: thisPool.sizes.length > 1 ? 'Sizes' : 'Size',
      type: 'input',
      placeholder: '',
      value: thisPool.name,
      setValue: (sizes: string) => setThisPool(prev => ({ ...prev, sizes.trim().split(',') }))
    },
    {
      label: thisPool.depths.length > 1 ? 'Depths' : 'Depth',
      type: 'input',
      placeholder: '',
      value: thisPool.name,
      setValue: (name: string) => setThisPool(prev => ({ ...prev, name }))
    },
    {
      label: 'Pool Name',
      type: 'input',
      placeholder: '',
      value: thisPool.name,
      setValue: (name: string) => setThisPool(prev => ({ ...prev, name }))
    },
  ]

  return (
    <div className='pools-pool-info-container'>
      <EditableComponent>
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