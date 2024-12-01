import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EditableComponent from '../Edit/EditableComponent';
import { Item } from '../Edit/EditModal';

import './Home.css';

interface PageDetail {
  id: string;
  tag: string;
  title: string;
  description: string;
}

interface Props {
  tag: string;
  className?: string;
}

const SectionDesc = ({ tag, className }: Props) => {
  const apiUrl = import.meta.env.VITE_API_URL as string;

  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [pageDetail, setPageDetail] = useState({
    id: '',
    tag: '',
    title: '',
    description: ''
  });

  const items: Item[] = [
    {
      label: 'Title',
      type: 'input',
      placeholder: '',
      value: pageDetail.title,
      setValue: (title: string) => setPageDetail(prev => ({ ...prev, title })),
    },
    {
      label: 'Description',
      type: 'textarea',
      placeholder: '',
      value: pageDetail.description,
      setValue: (description: string) => setPageDetail(prev => ({ ...prev, description })),
    },
  ]

  const fetchPageDetail = async () => {
    try {
      const res = await axios.get<PageDetail>(`${apiUrl}/getpagedetails/${tag}`);
      setPageDetail(res.data);
    } catch (err: any) {
        console.error(err);
    }
  }

  useEffect(() => {
    fetchPageDetail();
  }, [])

  const submit = async () => {
    const formData = new FormData();
    formData.append('tag', pageDetail.tag);
    formData.append('title', pageDetail.title);
    formData.append('description', pageDetail.description);
    try {
      const res = await axios.put<PageDetail>(`${apiUrl}/modifypagedetails`, formData);
      console.log(res.data);
      await fetchPageDetail();
    } catch (err: any) {
      console.error(err);
    }
    return;
  }

  return(
    <EditableComponent items={items} submit={submit}>
      <div className={className}>
        <h1 className='home-section-title'>{pageDetail.title}</h1>
        <p className='home-section-desc'>{pageDetail.description}</p>
      </div>
    </EditableComponent>
  )
}

export default SectionDesc;