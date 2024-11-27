import { useEffect, useState } from 'react';
import axios from 'axios';

import './Pools.css';
import PoolContainer from './PoolContainer';
import TitleDesc from '../TitleDesc';
import ContentContainer from '../ContentContainer';

interface Pool {
    id: string;
    tag: string;
    name: string;
    description: string;
    sizeDepth: [string,string][];
    image: string;
    model: string;
}

const Pools = () => {

    const apiUrl = import.meta.env.VITE_API_URL as string;
    const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

    const [pools, setPools] = useState<Pool[]>([]);

    const fetchPools = async () => {
        try {
            const res = await axios.get<Pool[]>(`${apiUrl}/allpools`); 
            setPools(res.data);
        } catch (err) {
            
        }
    };

    useEffect(() => {
        fetchPools();
    }, [])

    return (
        <ContentContainer>
            <TitleDesc tag='piscines' />
            <div className='pools-pool-container'>
                {pools.map((pool, index) => {
                    return(
                        <PoolContainer key={index} pool={pool} fetchPools={fetchPools}/>
                    );
                })}
            </div>
            { isAdmin && <button className='pools-add-button'>Add new pool</button> }
        </ContentContainer>
    )
}

export default Pools;