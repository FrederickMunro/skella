import './Pools.css';

interface Pool {
  id: string;
  poolname: string;
  description: string;
  sizes: string[];
  depths: string[];
  image: string;
  handleDelete: Function;
  handleEdit: () => void;
}

const PoolContainer = ({id, poolname, description, sizes, depths, image, handleDelete, handleEdit}: Pool) => {

  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  return (
    <div className='pools-pool-info-container'>
      {
        isAdmin && 
        <div className='pools-button-box'>
          <button className='pools-container-delete-button' onClick={handleEdit}>L</button>
          <button className='pools-container-delete-button' onClick={() => handleDelete(id)}>X</button>
        </div>}
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
  )
}

export default PoolContainer