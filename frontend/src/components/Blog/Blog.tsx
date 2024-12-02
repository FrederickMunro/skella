import axios from 'axios';
import TitleDesc from '../TitleDesc';
import { useEffect, useState } from 'react';
import BlogPost from './BlogPost';
import EditModal, { Item } from '../Edit/EditModal';

import './Blog.css';
import ItemContainer from '../ItemContainer';

interface PageDetail {
  id: string;
  tag: string;
  title: string;
  description: string;
  story: string;
  image: string;
}

const Blog = () => {
  const tag = 'blog-post';
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageDetails, setPageDetails] = useState<PageDetail[]>([]);
  const [newPageDetails, setNewPageDetails] = useState<PageDetail>({
    id: '',
    tag,
    title: '',
    description: '',
    image: '',
    story: ''
  });

  const items: Item[] = [
    {
      label: 'Title',
      type: 'input',
      placeholder: '',
      value: newPageDetails.title,
      setValue: (title: string) => setNewPageDetails(prev => ({ ...prev, title })),
    },
    {
      label: 'Subtitle',
      type: 'input',
      placeholder: '',
      value: newPageDetails.description,
      setValue: (description: string) => setNewPageDetails(prev => ({ ...prev, description })),
    },
    {
      label: 'Story',
      type: 'textarea',
      placeholder: '',
      value: newPageDetails.story,
      setValue: (story: string) => setNewPageDetails(prev => ({ ...prev, story })),
    },
    {
      label: 'Image',
      type: 'image',
      placeholder: '',
      value: newPageDetails.image,
      setValue: (image: string) => setNewPageDetails(prev => ({ ...prev, image })),
    },
  ]

  const fetchPageDetails = async () => {
    try {
      const res = await axios.get<PageDetail[]>(`${apiUrl}/getblogdetails/${tag}`);
      setPageDetails(res.data);
    } catch (err: any) {
        console.error(err);
    }
  }

  const submit = async () => {
    const formData = new FormData();
    formData.append('tag', tag);
    formData.append('title', newPageDetails.title);
    formData.append('description', newPageDetails.description);
    formData.append('story', newPageDetails.story);
    if (newPageDetails.image) {
      formData.append('image', newPageDetails.image);
    }

    try {
      await axios.post(`${apiUrl}/addpagedetails`, formData);
      fetchPageDetails();
      console.log('Successfully updated');
    } catch (err) {
      console.error('Error updating pool', err);
    }
    return;
  }

  useEffect(() => {
    fetchPageDetails();
  }, []);
  
  
  return(
      <div className='skella-light-blue-background'>
        <ItemContainer>
          <TitleDesc tag={'blog'}/>
        </ItemContainer>
        {pageDetails.map((blog, index) => {
          return <BlogPost fetch={fetchPageDetails} blog={blog} tag={tag} key={index} />
        })}
        {isAdmin &&
          <button onClick={() => {isAdmin && setIsModalOpen(true)}}>Add new blog</button>}
        {isAdmin && isModalOpen &&
        <EditModal items={items} submit={submit} close={() => setIsModalOpen(false)} />}
      </div>
  )
}

export default Blog;