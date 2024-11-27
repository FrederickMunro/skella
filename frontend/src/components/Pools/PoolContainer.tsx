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
  model: string;
}

interface newPool {
  id: string;
  tag: string;
  name: string;
  description: string;
  sizeDepth: [string,string][];
  prevImage: string;
  image: File | string |null;
  model: File | string | null;
}

const PoolContainer = ({ pool, fetchPools }: Props) => {

  const apiUrl = import.meta.env.VITE_API_URL as string;
  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [newPool, setNewPool] = useState<newPool>({
    id: pool.id,
    tag: pool.tag,
    name: pool.name,
    description: pool.description,
    sizeDepth: pool.sizeDepth,
    prevImage: pool.image,
    image: null,
    model: null,
  });

  const items: Item[] = [
    {
      label: 'Nom',
      type: 'input',
      value: newPool.name,
      setValue: (name: string) => setNewPool(prev => ({ ...prev, name }))
    },
    {
      label: 'Description',
      type: 'textarea',
      value: newPool.description,
      setValue: (description: string) => setNewPool(prev => ({ ...prev, description }))
    },
    {
      label: 'Dimensions',
      type: 'sizedepth',
      value: newPool.sizeDepth,
      setValue: (sizeDepth: [string, string][]) => setNewPool(prev => ({ ...prev, sizeDepth }))
    },
    {
      label: 'Image',
      type: 'image',
      placeholder: '',
      value: pool.image,
      setValue: (image: File | string) => setNewPool(prev => ({ ...prev, image }))
    },
    {
      label: 'Model',
      type: 'image',
      placeholder: '',
      value: pool.model,
      setValue: (model: File | string) => setNewPool(prev => ({ ...prev, model }))
    }
  ]

  const submit = async () => {
    const formData = new FormData();
    formData.append('name', newPool.name);
    formData.append('description', newPool.description);
    formData.append('sizedepth', JSON.stringify(newPool.sizeDepth));
    if (newPool.image) {
      formData.append('image', newPool.image);
    }
    if (newPool.model) {
      formData.append('model', newPool.model);
    }

    try {
      await axios.put(`${apiUrl}/pools/${pool.id}`, formData);
      console.log('Successfully updated');
      fetchPools();
    } catch (err) {
      console.error('Error updating pool', err);
    }
  }

  const remove = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this pool? This action cannot be undone.');
    if (!isConfirmed) return;
    try {
        await axios.delete(`${apiUrl}/pools/${pool.id}`);
        fetchPools();
      } catch (err) {
        console.error('Error deleting pool', err);
    }
  }

  useEffect(() => {
  }, [])

  return (
    <div className='pools-pool-info-container main-color-background'>
      <div className='pools-pool-nested-info-container'>
        <EditableComponent items={items} submit={submit} remove={remove}>
          <img
            src={pool.image}
            alt={pool.name}
            className="pools-pool-image"
            loading='lazy'
          />
          <img 
            src={pool.model}
            className='pools-pool-model'
          />
          <h2 className='pools-container-title'>{pool.name}</h2>
          <p className='pools-container-desc'>{pool.description}</p>
          <h3>Available sizes</h3>
          {
            pool.sizeDepth.map((item, index) => {
              return <p key={index}>{`size: ${item[0]}, depth: ${item[1]}`}</p>
            })
          }
        </EditableComponent>
      </div>
    </div>
  )
}

export default PoolContainer