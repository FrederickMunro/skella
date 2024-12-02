
import { useState } from 'react';
import EditableComponent from '../Edit/EditableComponent';
import { Item } from '../Edit/EditModal';
import axios from 'axios';

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

interface Props {
  blog: PageDetail;
  fetch: Function;
  tag: string;
}

const BlogPost = ({ blog, fetch }: Props) => {
  const apiUrl = import.meta.env.VITE_API_URL as string;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [pageDetail, setPageDetail] = useState<PageDetail>({
    id: blog.id,
    tag: blog.tag,
    title: blog.title,
    description: blog.description,
    image: blog.image,
    story: blog.story
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
      label: 'Subtitle',
      type: 'input',
      placeholder: '',
      value: pageDetail.description,
      setValue: (description: string) => setPageDetail(prev => ({ ...prev, description })),
    },
    {
      label: 'Story',
      type: 'textarea',
      placeholder: '',
      value: pageDetail.story,
      setValue: (story: string) => setPageDetail(prev => ({ ...prev, story })),
    },
    {
      label: 'Image',
      type: 'image',
      placeholder: '',
      value: pageDetail.image,
      setValue: (image: string) => setPageDetail(prev => ({ ...prev, image })),
    },
  ]
  
  const submit = async () => {
    console.log(pageDetail.id)
    const formData = new FormData();
    formData.append('id', pageDetail.id);
    formData.append('tag', pageDetail.tag);
    formData.append('title', pageDetail.title);
    formData.append('description', pageDetail.description);
    formData.append('story', pageDetail.story);
  
    if (pageDetail.image) {
        formData.append('image', pageDetail.image);
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
        await fetch();
    } catch (err: any) {
        console.error(err);
    }
  };

  const remove = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this pool? This action cannot be undone.');
    if (!isConfirmed) return;
    try {
        await axios.delete(`${apiUrl}/pagedetail/${pageDetail.id}`);
        fetch();
      } catch (err) {
        console.error('Error deleting pool', err);
    }
  }

  return(
    <ItemContainer>
      <div className="blog-post">
        <EditableComponent items={items} submit={submit} remove={remove}>
          {/* Image */}
          <img className="blog-post-image" src={blog.image} alt={blog.title} />

          {/* Title and Subtitle */}
          <div className="blog-post-header">
            <h2 className="blog-post-title">{blog.title}</h2>
            <h3 className="blog-post-description">{blog.description}</h3>
          </div>

          {/* Story with Expand/Collapse */}
          <div className={`blog-post-story ${isExpanded ? "expanded" : "collapsed"}`}>
            {blog.story.split('\n').map((paragraph,index) => {
              return <p key={index}>{paragraph}</p>
            })}
          </div>

          {/* Expand/Collapse Button */}
          <button className="blog-post-toggle" onClick={toggleExpand}>
            {isExpanded ? "Lire moins" : "Lire plus"}
          </button>
        </EditableComponent>
      </div>
    </ItemContainer>
  );
}

export default BlogPost;