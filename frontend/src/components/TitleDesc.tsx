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
}

interface Props {
  tag: string;
}

const TitleDesc = ({ tag }: Props) => {
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
      console.log(res.data);
      setPageDetail(res.data);
    } catch (err: any) {
        console.error(err);
    }
  }

  useEffect(() => {
    fetchPageDetail();
  }, [])

  const submit = () => {
    return;
  }

  return(
    <EditableComponent items={items} submit={submit}>
      <Helmet>
        <title>{pageDetail.title}</title>
        <meta name='description' content={pageDetail.description} />
      </Helmet>
      <div>
        <h1>{pageDetail.title}</h1>
        {
          isAdmin && 
          <>
            <p>{pageDetail.description}</p>
          </>
        }
      </div>
    </EditableComponent>
  )
}

export default TitleDesc;