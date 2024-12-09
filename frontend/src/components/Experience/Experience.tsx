import axios from "axios";
import { useEffect, useState } from "react";
import ContentContainer from "../ContentContainer";
import TitleDesc from "../TitleDesc";
import EditModal from "../Edit/EditModal";
import ExperienceBox from "./ExperienceBox";
import ServiceSection from "../Home/ServiceSection";
import SectionDesc from "../Home/SectionDesc";

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

const Experience = () => {
  const tag = 'experience-skella'
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
      label: 'Description',
      type: 'textarea',
      value: newPool.description,
      placeholder: 'Enter pool description...',
      setValue: (description: string) => setNewPool(prev => ({ ...prev, description }))
    },
    {
      label: 'Before',
      type: 'image',
      value: newPool.image,
      setValue: (image: string) => setNewPool(prev => ({ ...prev, image }))
    },
    {
      label: 'After',
      type: 'image',
      value: newPool.model,
      setValue: (model: string) => setNewPool(prev => ({ ...prev, model }))
    },
  ]

  const submit = async () => {
    const formData = new FormData();
    formData.append('tag', tag);
    formData.append('description', newPool.description);
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

  return(
    <div className='experience-container'>
      <TitleDesc tag={tag}/>
      <SectionDesc tag={`${tag}-sec`} className="background-sand-to-blue" />
      {pools.map((experience, index) => {
        console.log(index);
        return <ExperienceBox experience={experience} fetchExperiences={fetchPools} key={index} />
      })}
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
    </div>
  )
}

export default Experience;