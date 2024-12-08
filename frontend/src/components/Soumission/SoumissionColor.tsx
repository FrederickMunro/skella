import axios from "axios";

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
  color: Pool;
  selectedPool: Pool | null;
  setSelectedPool: Function;
}

const SoumissionColor = ({ color, selectedPool, setSelectedPool }: Props) => {
  return(
    <div
      className={`soumission-pool-container 
                 skella-dark-blue-background 
                 skella-light-blue-color
                 ${selectedPool === color ? 'pool-is-selected' : 'pool-isnt-selected'}`}
      onClick={() => setSelectedPool(color)}
    >
      <input
        type="radio"
        name="pool-selection"
        className="pool-selection"
        id={`pool-${color.id}`}
        value={color.name}
        checked={selectedPool === color}
        onChange={() => setSelectedPool(color)}
      />
      <label className={`checkbox-soumission ${selectedPool === color ? 'checkbox-soumission-check' : ''}`}>✔</label>
      <h3 className='soumission-pool-title'>{color.name}</h3>
      <div className='soumission-color-container'>
        <img className='soumission-color-image skella-dark-blue-background' src={color.image} draggable='false'/>
        <img className='soumission-color-image skella-dark-blue-background' src={color.model} draggable='false'/>
      </div>
    </div>
  );
}

export default SoumissionColor;