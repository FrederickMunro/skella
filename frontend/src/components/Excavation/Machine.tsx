import { useEffect, useState } from "react";
import { Item } from "../Edit/EditModal";
import axios from "axios";
import EditableComponent from "../Edit/EditableComponent";

import './Excavations.css';

interface PageDetail {
    id: string;
    tag: string;
    title: string;
    description: string;
    story: string;
    image: string;
  }
  
  interface Props {
    tag: string;
  }

const Machine = ({ tag }: Props) => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
  
    const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';
  
    const [pageDetail, setPageDetail] = useState({
      id: '',
      tag,
      title: '',
      description: '',
      story: '',
      image: ''
    });
  
    const items: Item[] = [
      {
        label: 'Title',
        type: 'input',
        value: pageDetail.title,
        setValue: (title: string) => setPageDetail(prev => ({ ...prev, title })),
      },
      {
        label: 'Description',
        type: 'input',
        value: pageDetail.description,
        setValue: (description: string) => setPageDetail(prev => ({ ...prev, description })),
      },
      {
        label: 'Story',
        type: 'textarea',
        value: pageDetail.story,
        setValue: (story: string) => setPageDetail(prev => ({ ...prev, story })),
      },
      {
        label: 'Image',
        type: 'image',
        value: pageDetail.image,
        setValue: (image: string) => setPageDetail(prev => ({ ...prev, image })),
      },
    ]
  
    const fetchPageDetail = async () => {
      try {
        const res = await axios.get<PageDetail[]>(`${apiUrl}/getblogdetails/${tag}`);
        setPageDetail(res.data[0]);
      } catch (err: any) {
          console.error(err);
      }
    }

    useEffect(() => {
        fetchPageDetail();
    }, [])

    const submit = async () => {
      const formData = new FormData();
      formData.append('id', pageDetail.id)
      formData.append('tag', pageDetail.tag);
      formData.append('title', pageDetail.title);
      formData.append('description', pageDetail.description);
      formData.append('story', pageDetail.story);
  
      // Append image as Base64 string if it exists
      if (pageDetail.image) {
          formData.append('image', pageDetail.image); // Directly append the Base64 string
      }
  
      for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
      }
  
      try {
          const res = await axios.put(`${apiUrl}/modifyblogdetails`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          console.log(res.data);
          await fetchPageDetail();
      } catch (err: any) {
          console.error(err);
      }
    };

    return(
        <div className='machine'>
            <EditableComponent items={items} submit={submit}>
                <img className='machine-img' src={pageDetail.image}/>
                <h2 className='machine-title'>{pageDetail.title}</h2>
                <h3 className='machine-desc'>{pageDetail.description}</h3>
                <p className='machine-story'>{pageDetail.story}</p>
            </EditableComponent>
        </div>
    );
}

export default Machine;