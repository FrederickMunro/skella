import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EditableComponent from './EditableComponent';

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

  const fetchPageDetail = async () => {
    try {
      const res = await axios.get<PageDetail>(`${apiUrl}/getpagedetails/${tag}`);
      console.log(res.data);
      setPageDetail(res.data);
    } catch (err: any) {
        console.error(err);
    }
  }

  const handleEdit = () => {
    return null;
  }

  useEffect(() => {
    fetchPageDetail();
  }, [])

  return(
    <EditableComponent handleEdit={handleEdit}>
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