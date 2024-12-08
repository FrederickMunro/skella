import './Soumission.css';

interface Pool {
  id: string;
  tag: string;
  name: string;
  description: string;
  sizeDepth: [string, string][];
  image: string;
  model: string;
  pdf: string;
}

interface Props {
  pool: Pool;
  selectedPool: Pool | null;
  setSelectedPool: Function;
}

const SoumissionPool = ({ pool, selectedPool, setSelectedPool }: Props) => {
  return(
    <div
      className={`soumission-pool-container 
                 skella-dark-blue-background 
                 skella-light-blue-color
                 ${selectedPool === pool ? 'pool-is-selected' : 'pool-isnt-selected'}`}
      onClick={() => setSelectedPool(pool)}
    >
      <input
        type="radio"
        name="pool-selection"
        className="pool-selection"
        id={`pool-${pool.id}`}
        value={pool.name}
        checked={selectedPool === pool}
        onChange={() => setSelectedPool(pool)}
      />
      <label className={`checkbox-soumission ${selectedPool === pool ? 'checkbox-soumission-check' : ''}`}>✔</label>
      <h3 className='soumission-pool-title'>{pool.name}</h3>
      <img className='soumission-pool-image skella-dark-blue-background' src={pool.model} draggable='false'/>
      <div className='soumission-pool-size'>
        <p className='soumission-pool-prof'>{pool.sizeDepth.length > 1 ? 'Profondeurs:' : 'Profondeur:'}</p>
        <div className='soumission-pool-sizes'>
          {pool.sizeDepth.map((sizeDepth, index) => {
              return <p key={index} className='soumission-sizelist'>{sizeDepth[1]}</p>
            })}
        </div>
      </div>
      <a href={pool.pdf} target='_blank'>
            <button className='pools-pool-detail-button'>Voir plus de details</button>
          </a>
    </div>
  );
}

export default SoumissionPool;