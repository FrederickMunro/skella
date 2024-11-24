import { useEffect, useState } from 'react';
import './Pools.css';
import EditableComponent from '../Edit/EditableComponent';
import { Item } from '../Edit/EditModal';
import axios from 'axios';

interface Props {
  pool: Pool;
  fetchPools: Function;
}

interface Pool {
  id: string;
  tag: string;
  name: string;
  description: string;
  sizeDepth: [string,string][];
  image: string;
}

const PoolContainer = ({ pool, fetchPools }: Props) => {

  const apiUrl = import.meta.env.VITE_API_URL as string;
  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [thisPool, setThisPool] = useState<Pool>(pool);

  const items: Item[] = [
    {
      label: 'Nom',
      type: 'input',
      value: thisPool.name,
      setValue: (name: string) => setThisPool(prev => ({ ...prev, name }))
    },
    {
      label: 'Description',
      type: 'textarea',
      value: thisPool.description,
      setValue: (description: string) => setThisPool(prev => ({ ...prev, description }))
    },
    {
      label: 'Dimensions',
      type: 'sizedepth',
      value: thisPool.sizeDepth,
      setValue: (sizeDepth: [string, string][]) => { setThisPool(prev => ({ ...prev, sizeDepth })); console.log(thisPool.sizeDepth) }
    },
    {
      label: 'Image',
      type: 'image',
      placeholder: '',
      value: thisPool.image,
      setValue: (image: string) => setThisPool(prev => ({ ...prev, image }))
    },
  ]

  const submit = async () => {
    const formData = new FormData();
    formData.append('name', thisPool.name);
    formData.append('description', thisPool.description);
    formData.append('sizedepth', JSON.stringify(thisPool.sizeDepth));
    if (thisPool.image) {
      console.log(thisPool.image);
      formData.append('image', thisPool.image); // Base64 string
    }

    try {
      await axios.put(`${apiUrl}/pools/${thisPool.id}`, formData);
      console.log('Successfully updated');
      fetchPools();
    } catch (err) {
      console.error('Error updating pool', err);
    }
    return;
  }

  const remove = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this pool? This action cannot be undone.');
    if (!isConfirmed) return;
    try {
        await axios.delete(`${apiUrl}/pools/${thisPool.id}`);
        fetchPools();
      } catch (err) {
        console.error('Error deleting pool', err);
    }
  }

  useEffect(() => {
  }, [])

  return (
    <div className='pools-pool-info-container'>
      <EditableComponent items={items} submit={submit} remove={remove}>
        <div className='pools-pool-nested-info-container'>
          <h2 className='pools-container-title'>{thisPool.name}</h2>
          <p className='pools-container-desc'>{thisPool.description}</p>
          <img
            src={typeof thisPool.image === 'string' ? thisPool.image : ''} 
            alt={thisPool.name}
            className="pools-pool-image"
            loading='lazy'
          />
          <h3>Available sizes</h3>
          {
            thisPool.sizeDepth.map((item, index) => {
              return <p key={index}>{`size: ${item[0]}, depth: ${item[1]}`}</p>
            })
          }
        </div>
      </EditableComponent>
    </div>
  )
}

export default PoolContainer