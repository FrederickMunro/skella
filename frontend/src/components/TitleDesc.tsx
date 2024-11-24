import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EditableComponent from './Edit/EditableComponent';
import { Item } from './Edit/EditModal';

interface PageDetail {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  tag: string;
}

const TitleDesc = ({ tag }: Props) => {
  const apiUrl = import.meta.env.VITE_API_URL as string;

  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [pageDetail, setPageDetail] = useState({
    id: '',
    tag,
    title: '',
    description: '',
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
      type: 'textarea',
      value: pageDetail.description,
      setValue: (description: string) => setPageDetail(prev => ({ ...prev, description })),
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

    // Append image as Base64 string if it exists
    if (pageDetail.image) {
        formData.append('image', pageDetail.image); // Directly append the Base64 string
    }

    try {
        const res = await axios.put(`${apiUrl}/modifypagedetails`, formData, {
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
    <EditableComponent items={items} submit={submit}>
      <Helmet>
        <title>{pageDetail.title}</title>
        <meta name='description' content={pageDetail.description} />
      </Helmet>
      <div style={{
        backgroundImage: `url(${pageDetail.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '40rem', // Set the height as needed
        width: '100%', // Set the width as needed
        color: 'white', // Adjust text color for readability
      }}>
        <h1>{pageDetail.title}</h1>
        { isAdmin && <p>{pageDetail.description}</p> }
      </div>
    </EditableComponent>
  )
}

export default TitleDesc;