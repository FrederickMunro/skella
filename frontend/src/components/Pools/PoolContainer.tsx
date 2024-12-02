import { useEffect, useState } from 'react';
import './Pools.css';
import EditableComponent from '../Edit/EditableComponent';
import { Item } from '../Edit/EditModal';
import axios from 'axios';
import { useInView } from "react-intersection-observer";

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
  pdf: string;
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
  pdf: File | null;
}

const PoolContainer = ({ pool, fetchPools }: Props) => {
  const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true,
});

  const apiUrl = import.meta.env.VITE_API_URL as string;

  const [newPool, setNewPool] = useState<newPool>({
    id: pool.id,
    tag: pool.tag,
    name: pool.name,
    description: pool.description,
    sizeDepth: pool.sizeDepth,
    prevImage: pool.image,
    image: null,
    model: null,
    pdf: null,
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
    },
    {
      label: 'Blueprint',
      type: 'pdf',
      placeholder: '',
      value: pool.pdf,
      setValue: (pdf: File) => setNewPool(prev => ({ ...prev, pdf }))
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
    if (newPool.pdf) {
      formData.append('pdf', newPool.pdf);
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
      <div
        ref={ref}
        className={`pools-pool-nested-info-container inview-container ${inView ? "visible" : "hidden"}`}
      >
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
          <a href={pool.pdf} target='_blank'>
            <button className='pools-pool-detail-button'>Voir plus de details</button>
          </a>
        </EditableComponent>
      </div>
    </div>
  )
}

export default PoolContainer