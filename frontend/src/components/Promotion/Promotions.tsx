
import axios from 'axios';
import { useState, useEffect } from 'react';
import EditModal, { Item } from '../Edit/EditModal';
import './Promotion.css';
import SectionDesc from '../Home/SectionDesc';
import Promotion from './Promotion';

interface PageDetail {
    id: string;
    tag: string;
    title: string;
    description: string;
    story: string;
    image: string;
}

const Promotions = () => {
    const tag = 'promotion';
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

    return (
        <div className='promotions-container'>
            <div className='promotions'>
                {pageDetails.map((item, index) => {
                    return <Promotion item={item} fetchPageDetail={fetchPageDetails} key={index} />
                })}
                {isAdmin &&
                    <button onClick={() => {isAdmin && setIsModalOpen(true)}}>Add new item</button>}
                {isAdmin && isModalOpen &&
                    <EditModal items={items} submit={submit} close={() => setIsModalOpen(false)} />}
            </div>
        </div>
    );
}

export default Promotions;