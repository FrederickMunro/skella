import axios from "axios";
import { Item } from "../Edit/EditModal";
import { useEffect, useState } from "react";
import ItemContainer from "../ItemContainer";
import EditableComponent from "../Edit/EditableComponent";

import './Promotion.css';

interface PageDetail {
    id: string;
    tag: string;
    title: string;
    description: string;
    image: string;
}

interface Props {
    item: PageDetail;
    fetchPageDetail: Function;
}

const Promotion = ({ item, fetchPageDetail }: Props) => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const tag = 'promotions';

    const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';
  
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [pageDetail, setPageDetail] = useState({
      id: item.id,
      tag,
      title: '',
      description: '',
      image: item.image
    });
  
    const items: Item[] = [
      {
        label: 'Image',
        type: 'image',
        value: pageDetail.image,
        setValue: (image: string) => setPageDetail(prev => ({ ...prev, image })),
      },
    ]
  
    useEffect(() => {
      fetchPageDetail();
    }, []);
  
    const submit = async () => {
      const formData = new FormData();
      formData.append('id', pageDetail.id)
      formData.append('tag', pageDetail.tag);
  
      if (pageDetail.image) {
          formData.append('image', pageDetail.image); // Directly append the Base64 string
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

    return (
        <ItemContainer>
            <div className='promotion-item' onClick={() => setIsClicked(prev => !prev)}>
                <EditableComponent submit={submit} items={items}>
                    <img className='promotion-image' src={item.image} />
                </EditableComponent>
            </div>
        </ItemContainer>
    );
}

export default Promotion;