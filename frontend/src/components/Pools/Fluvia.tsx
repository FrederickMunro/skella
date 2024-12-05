import axios from "axios";
import ContentContainer from "../ContentContainer";
import TitleDesc from "../TitleDesc";
import PoolContainer from "./PoolContainer";
import { useEffect, useState } from "react";
import EditModal from "../Edit/EditModal";

import './Pools.css';

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

interface newPool {
  tag: string;
  name: string;
  description: string;
  sizeDepth: [string, string][]
  image: string;
  model: string;
  pdf: string;
}

const Fluvia = () => {
  const tag = 'piscines-fluvia'
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pools, setPools] = useState<Pool[]>([]);
  const [newPool, setNewPool] = useState<newPool>({
    name: '',
    tag,
    description: '',
    sizeDepth: [],
    image: '',
    model: '',
    pdf: '',
  });

  const fetchPools = async () => {
    try {
      const res = await axios.get<Pool[]>(`${apiUrl}/poolsbytag/${tag}`); 
      setPools(res.data);
      console.log(res.data);
    } catch (err) {
        
    }
  };

  const addPoolItems = [
    {
      label: 'Nom',
      type: 'input',
      value: newPool.name,
      placeholder: 'Enter pool name...',
      setValue: (name: string) => setNewPool(prev => ({ ...prev, name }))
    },
    {
      label: 'Description',
      type: 'textarea',
      value: newPool.description,
      placeholder: 'Enter pool description...',
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
      value: newPool.image,
      setValue: (image: string) => setNewPool(prev => ({ ...prev, image }))
    },
    {
      label: 'Model',
      type: 'image',
      value: newPool.model,
      setValue: (model: string) => setNewPool(prev => ({ ...prev, model }))
    },
  ]

  const submit = async () => {
    const formData = new FormData();
    formData.append('tag', tag);
    formData.append('name', newPool.name);
    formData.append('description', newPool.description);
    if (newPool.sizeDepth) {
      formData.append('sizedepth', JSON.stringify(newPool.sizeDepth));
    }
    if (newPool.image) {
      formData.append('image', newPool.image);
    }
    if (newPool.model) {
      formData.append('model', newPool.model);
    }

    try {
      await axios.post(`${apiUrl}/addpool`, formData);
      fetchPools();
      console.log('Successfully updated');
    } catch (err) {
      console.error('Error updating pool', err);
    }
    return;
  }

  useEffect(() => {
      fetchPools();
  }, [])

  return (
      <ContentContainer>
          <TitleDesc tag={tag} />
          <div className='pools-pool-container'>
              {pools.map((pool, index) => {
                  return(
                      <PoolContainer key={index} pool={pool} fetchPools={fetchPools}/>
                  );
              })}
          </div>
          {
            isAdmin && 
            <button
              className='pools-add-button'
              onClick={() => isAdmin && setIsModalOpen(true)}
            >Add new pool</button>
          }
          {
            isAdmin && isModalOpen &&
            <EditModal items={addPoolItems} submit={submit} close={() => setIsModalOpen(false)} />
          }
      </ContentContainer>
  )
}

export default Fluvia;