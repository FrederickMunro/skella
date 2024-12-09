import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../Edit/EditModal";
import EditableComponent from "../Edit/EditableComponent";
import ItemContainer from "../ItemContainer";

interface Props {
    tag: string;
}

interface PageDetail {
    id: string;
    tag: string;
    title: string;
    image: string;
  }

const PoolSubtitle = ({ tag }: Props) => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
  
    const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

    const [pageDetail, setPageDetail] = useState({
        id: '',
        tag,
        title: '',
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
          console.log(res.data);
        } catch (err: any) {
            console.error(err);
        }
      }
    
      useEffect(() => {
        fetchPageDetail();
      }, []);
    
      const submit = async () => {
        const formData = new FormData();
        formData.append('tag', pageDetail.tag);
        formData.append('title', pageDetail.title);
    
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
            <ItemContainer>
                <div className='pool-subtitle-container'>
                    <img className='pool-subtitle-image' src={pageDetail.image} />
                    <h3 className='pool-subtitle-title'>{pageDetail.title}</h3>
                </div>
            </ItemContainer>
        </EditableComponent>
    )
}

export default PoolSubtitle;