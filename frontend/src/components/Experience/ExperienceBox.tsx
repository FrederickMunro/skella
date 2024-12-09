import axios from "axios";
import { useState } from "react";
import EditableComponent from "../Edit/EditableComponent";
import { Item } from "../Edit/EditModal";

import './Experience.css';

interface Props {
    experience: Pool;
    fetchExperiences: Function;
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

const ExperienceBox = ({ experience, fetchExperiences }: Props) => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
  
    const [newPool, setNewPool] = useState<newPool>({
      id: experience.id,
      tag: experience.tag,
      name: experience.name,
      description: experience.description,
      sizeDepth: experience.sizeDepth,
      prevImage: experience.image,
      image: null,
      model: null,
      pdf: null,
    });
  
    const items: Item[] = [
      {
        label: 'Description',
        type: 'textarea',
        value: newPool.description,
        setValue: (description: string) => setNewPool(prev => ({ ...prev, description }))
      },
      {
        label: 'Before',
        type: 'image',
        placeholder: '',
        value: experience.image,
        setValue: (image: File | string) => setNewPool(prev => ({ ...prev, image }))
      },
      {
        label: 'After',
        type: 'image',
        placeholder: '',
        value: experience.model,
        setValue: (model: File | string) => setNewPool(prev => ({ ...prev, model }))
      }
    ]
  
    const submit = async () => {
      const formData = new FormData();
      formData.append('description', newPool.description);
      if (newPool.image) {
        formData.append('image', newPool.image);
      }
      if (newPool.model) {
        formData.append('model', newPool.model);
      }
  
      try {
        await axios.put(`${apiUrl}/pools/${experience.id}`, formData);
        console.log('Successfully updated');
        fetchExperiences();
      } catch (err) {
        console.error('Error updating pool', err);
      }
    }
  
    const remove = async () => {
      const isConfirmed = window.confirm('Are you sure you want to delete this pool? This action cannot be undone.');
      if (!isConfirmed) return;
      try {
          await axios.delete(`${apiUrl}/pools/${experience.id}`);
          fetchExperiences();
        } catch (err) {
          console.error('Error deleting pool', err);
      }
    }

    const [moved, setMoved] = useState<boolean>(false);

    return(
        <div className='experience-outer-box'>
            <EditableComponent items={items} submit={submit} remove={remove}>
                <div className='experience-box'>
                    <div className={`experience-box-image-container ${moved && 'moved'}`}>
                        <img className='experience-box-image before' src={experience.image} />
                        <div
                            className={`experience-arrow ${moved ? 'right' : 'left'}`}
                            onClick={() => setMoved((prev) => !prev)}
                        >
                            <div className={`experience-arrow-tip ${moved ? 'right' : 'left'}`}/>
                        </div>
                        <img className='experience-box-image after' src={experience.model} />
                    </div>
                    <div className='avant-apres-container'>
                        <button className={`aabutton ${moved ? '' : 'moved'}`} onClick={() => setMoved(false)}>AVANT</button>
                        <button className={`aabutton ${moved ? 'moved' : ''}`} onClick={() => setMoved(true)}>APRES</button>
                    </div>
                    <p className='experience-box-desc'>{experience.description}</p>
                </div>
            </EditableComponent>
        </div>
    )
}

export default ExperienceBox;