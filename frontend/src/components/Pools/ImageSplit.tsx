import { useState } from "react";

import './Pools.css';
import EditableComponent from "../Edit/EditableComponent";
import { Item } from "../Edit/EditModal";
import axios from "axios";

interface Props {
    color: Pool;
    fetch: Function;
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

const ImageSplit = ({ color, fetch }: Props) => {
    const [dividerPosition, setDividerPosition] = useState<number>(50); // Default to middle (50%)

    const apiUrl = import.meta.env.VITE_API_URL as string;
    const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';
  
    const [newPool, setNewPool] = useState<newPool>({
      id: color.id,
      tag: color.tag,
      name: color.name,
      description: color.description,
      sizeDepth: color.sizeDepth,
      prevImage: color.image,
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
        type: 'input',
        value: newPool.description,
        setValue: (description: string) => setNewPool(prev => ({ ...prev, description }))
      },
      {
        label: 'Dry Image',
        type: 'image',
        placeholder: '',
        value: color.image,
        setValue: (image: File | string) => setNewPool(prev => ({ ...prev, image }))
      },
      {
        label: 'Water Image',
        type: 'image',
        placeholder: '',
        value: color.model,
        setValue: (model: File | string) => setNewPool(prev => ({ ...prev, model }))
      }
    ]
  
    const submit = async () => {
      const formData = new FormData();
      formData.append('name', newPool.name);
      formData.append('description', newPool.description);
      if (newPool.image) {
        formData.append('image', newPool.image);
      }
      if (newPool.model) {
        formData.append('model', newPool.model);
      }
  
      try {
        await axios.put(`${apiUrl}/pools/${color.id}`, formData);
        console.log('Successfully updated');
        fetch();
      } catch (err) {
        console.error('Error updating color', err);
      }
    }
  
    const remove = async () => {
      const isConfirmed = window.confirm('Are you sure you want to delete this color? This action cannot be undone.');
      if (!isConfirmed) return;
      try {
          await axios.delete(`${apiUrl}/pools/${color.id}`);
          fetch();
        } catch (err) {
          console.error('Error deleting color', err);
      }
    }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    // Get the vertical position relative to the container
    const offsetY = e.clientY - rect.top;

    // Constrain the offset within the container bounds
    if (offsetY >= 0 && offsetY <= rect.height) {
      const percentage = (offsetY / rect.height) * 100;
      setDividerPosition(percentage);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    // Get the vertical position relative to the container
    const offsetY = e.touches[0].clientY - rect.top;

    // Constrain the offset within the container bounds
    if (offsetY >= 0 && offsetY <= rect.height-5) {
      const percentage = (offsetY / rect.height) * 100;
      setDividerPosition(percentage);
    }
  };

    return (
        <div className='color-container'>
            <EditableComponent items={items} submit={submit} remove={remove}>
                <h3 className='color-title'>{color.name}</h3>
                <p className='color-water'>Sans eau</p>
                <div
                className="image-container"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                >
                    <img
                        src={color.image}
                        className="image-top"
                        alt="Top Image"
                        style={{ clipPath: `inset(0 0 ${100 - dividerPosition}% 0)` }}
                    />
                    <img
                        src={color.model}
                        className="image-bottom"
                        alt="Bottom Image"
                        style={{ clipPath: `inset(${dividerPosition}% 0 0 0)` }}
                    />
                    <div
                        className="divider"
                        style={{ top: `${dividerPosition}%` }}
                        draggable={false}
                    >
                        <span className="arrow arrow-up">▲</span>
                        <span className="arrow arrow-down">▼</span>
                    </div>
                </div>
                <p className='color-water'>Avec eau</p>
            </EditableComponent>
        </div>
    );
};

export default ImageSplit;