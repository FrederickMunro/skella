import axios from "axios";
import ContentContainer from "../ContentContainer";
import TitleDesc from "../TitleDesc";
import PoolContainer from "./PoolContainer";
import { useEffect, useState } from "react";
import EditModal from "../Edit/EditModal";

interface Pool {
    id: string;
    tag: string;
    name: string;
    description: string;
    sizeDepth: [string, string][];
    image: string;
}

interface newPool {
  tag: string;
  name: string;
  description: string;
  sizeDepth: [string, string][]
  image: string;
}

const Evoa = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const tag = 'piscines-evoa';
  const tagRec = 'piscines-evoa-rec';
  const [isRecModalOpen, setIsRecModalOpen] = useState(false);
  const [recPools, setRecPools] = useState<Pool[]>([]);
  const [newRecPool, setNewRecPool] = useState<newPool>({
    name: '',
    tag: tagRec,
    description: '',
    sizeDepth: [],
    image: ''
  });

  const addPoolRecItems = [
    {
      label: 'Nom',
      type: 'input',
      value: newRecPool.name,
      placeholder: 'Enter pool name...',
      setValue: (name: string) => setNewRecPool(prev => ({ ...prev, name }))
    },
    {
      label: 'Description',
      type: 'textarea',
      value: newRecPool.description,
      placeholder: 'Enter pool description...',
      setValue: (description: string) => setNewRecPool(prev => ({ ...prev, description }))
    },
    {
      label: 'Dimensions',
      type: 'sizedepth',
      value: newRecPool.sizeDepth,
      setValue: (sizeDepth: [string, string][]) => setNewRecPool(prev => ({ ...prev, sizeDepth }))
    },
    {
      label: 'Image',
      type: 'image',
      value: newRecPool.image,
      setValue: (image: string) => setNewRecPool(prev => ({ ...prev, image }))
    },
  ]

  const submitRec = async () => {
    console.log(newRecPool.sizeDepth)
    console.log(JSON.stringify(newRecPool.sizeDepth))
    const formData = new FormData();
    formData.append('name', newRecPool.name);
    formData.append('description', newRecPool.description);
    formData.append('tag', tagRec);
    formData.append('sizedepth', JSON.stringify(newRecPool.sizeDepth));
    if (newRecPool.image) {
      formData.append('image', newRecPool.image);
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
  
  const tagCirc = 'piscines-evoa-circ';
  const [isCircModalOpen, setIsCircModalOpen] = useState(false);
  const [circPools, setCircPools] = useState<Pool[]>([]);
  const [newCircPool, setNewCircPool] = useState<newPool>({
    name: '',
    tag: tagCirc,
    description: '',
    sizeDepth: [],
    image: ''
  });

  const addPoolCircItems = [
    {
      label: 'Nom',
      type: 'input',
      value: newCircPool.name,
      placeholder: 'Enter pool name...',
      setValue: (name: string) => setNewCircPool(prev => ({ ...prev, name }))
    },
    {
      label: 'Description',
      type: 'textarea',
      value: newCircPool.description,
      placeholder: 'Enter pool description...',
      setValue: (description: string) => setNewCircPool(prev => ({ ...prev, description }))
    },
    {
      label: 'Dimensions',
      type: 'sizedepth',
      value: newCircPool.sizeDepth,
      setValue: (sizeDepth: [string, string][]) => setNewCircPool(prev => ({ ...prev, sizeDepth }))
    },
    {
      label: 'Image',
      type: 'image',
      value: newCircPool.image,
      setValue: (image: string) => setNewCircPool(prev => ({ ...prev, image }))
    },
  ]

  const submitCirc = async () => {
    console.log(newCircPool.sizeDepth)
    console.log(JSON.stringify(newCircPool.sizeDepth))
    const formData = new FormData();
    formData.append('name', newCircPool.name);
    formData.append('description', newCircPool.description);
    formData.append('tag', tagCirc);
    formData.append('sizedepth', JSON.stringify(newCircPool.sizeDepth));
    if (newCircPool.image) {
      formData.append('image', newCircPool.image);
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
  
  const tagCla = 'piscines-evoa-cla';
  const [isClaModalOpen, setIsClaModalOpen] = useState(false);
  const [claPools, setClaPools] = useState<Pool[]>([]);
  const [newClaPool, setNewClaPool] = useState<newPool>({
    name: '',
    tag: tagCla,
    description: '',
    sizeDepth: [],
    image: ''
  });

  const addPoolClaItems = [
    {
      label: 'Nom',
      type: 'input',
      value: newClaPool.name,
      placeholder: 'Enter pool name...',
      setValue: (name: string) => setNewClaPool(prev => ({ ...prev, name }))
    },
    {
      label: 'Description',
      type: 'textarea',
      value: newClaPool.description,
      placeholder: 'Enter pool description...',
      setValue: (description: string) => setNewClaPool(prev => ({ ...prev, description }))
    },
    {
      label: 'Dimensions',
      type: 'sizedepth',
      value: newClaPool.sizeDepth,
      setValue: (sizeDepth: [string, string][]) => setNewClaPool(prev => ({ ...prev, sizeDepth }))
    },
    {
      label: 'Image',
      type: 'image',
      value: newClaPool.image,
      setValue: (image: string) => setNewClaPool(prev => ({ ...prev, image }))
    },
  ]

  const submitCla = async () => {
    console.log(newClaPool.sizeDepth)
    console.log(JSON.stringify(newClaPool.sizeDepth))
    const formData = new FormData();
    formData.append('name', newClaPool.name);
    formData.append('description', newClaPool.description);
    formData.append('tag', tagCla);
    formData.append('sizedepth', JSON.stringify(newClaPool.sizeDepth));
    if (newClaPool.image) {
      formData.append('image', newClaPool.image);
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

  const fetchPools = async () => {
      try {
          const recRes = await axios.get<Pool[]>(`${apiUrl}/poolsbytag/${tagRec}`); 
          setRecPools(recRes.data);
          const circRes = await axios.get<Pool[]>(`${apiUrl}/poolsbytag/${tagCirc}`); 
          setCircPools(circRes.data);
          const claRes = await axios.get<Pool[]>(`${apiUrl}/poolsbytag/${tagCla}`); 
          setClaPools(claRes.data);
      } catch (err) {
          
      }
  };

  useEffect(() => {
      fetchPools();
  }, [])

  return (
    <>
      <ContentContainer>
          <TitleDesc tag={tag} />
          <div className='pools-pool-container'>
              {recPools.map((pool, index) => {
                  return(
                      <PoolContainer key={index} pool={pool} fetchPools={fetchPools}/>
                  );
              })}
          </div>
          {
            isAdmin && 
            <button
              className='pools-add-button'
              onClick={() => isAdmin && setIsRecModalOpen(true)}
            >Add new pool</button>
          }
          {
            isAdmin && isRecModalOpen &&
            <EditModal items={addPoolRecItems} submit={submitRec} close={() => setIsRecModalOpen(false)} />
          }
      </ContentContainer>
      <ContentContainer>
          <div className='pools-pool-container'>
              {circPools.map((pool, index) => {
                  return(
                      <PoolContainer key={index} pool={pool} fetchPools={fetchPools}/>
                  );
              })}
          </div>
          {
            isAdmin && 
            <button
              className='pools-add-button'
              onClick={() => isAdmin && setIsCircModalOpen(true)}
            >Add new pool</button>
          }
          {
            isAdmin && isCircModalOpen &&
            <EditModal items={addPoolCircItems} submit={submitCirc} close={() => setIsCircModalOpen(false)} />
          }
      </ContentContainer>
      <ContentContainer>
          <div className='pools-pool-container'>
              {claPools.map((pool, index) => {
                  return(
                      <PoolContainer key={index} pool={pool} fetchPools={fetchPools}/>
                  );
              })}
          </div>
          {
            isAdmin && 
            <button
              className='pools-add-button'
              onClick={() => isAdmin && setIsClaModalOpen(true)}
            >Add new pool</button>
          }
          {
            isAdmin && isClaModalOpen &&
            <EditModal items={addPoolClaItems} submit={submitCla} close={() => setIsClaModalOpen(false)} />
          }
      </ContentContainer>
    </>
  )
}

export default Evoa;