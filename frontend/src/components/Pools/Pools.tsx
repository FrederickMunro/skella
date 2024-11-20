import { useEffect, useState } from 'react';
import axios from 'axios';

import './Pools.css';
import PoolContainer from './PoolContainer';
import TitleDesc from '../TitleDesc';

interface Pool {
    id: string;
    name: string;
    description: string;
    sizes: string[];
    depths: string[];
    image: string;
}

const Pools = () => {

    const apiUrl = import.meta.env.VITE_API_URL as string;
    const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

    const [pools, setPools] = useState<Pool[]>([]);
    const [isAddPoolModalOpen, setIsAddPoolModalOpen] = useState<boolean>(false);
    const [newPool, setNewPool] = useState({
      name: '',
      description: '',
      sizes: '',
      depths: '',
      image: null as File | null
    });
    const [editingPool, setEditingPool] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        sizes: '',
        depths: '',
        image: null as File | null
    });

    // Add handler to start editing
    const handleEdit = (pool: Pool) => {
        setEditingPool(pool.id);
        setEditForm({
            name: pool.name,
            description: pool.description,
            sizes: pool.sizes.join(', '),
            depths: pool.depths.join(', '),
            image: null
        });
    };

    // Add handler for update submission
    const handleUpdate = async (id: string) => {
        const formData = new FormData();
        formData.append('name', editForm.name);
        formData.append('description', editForm.description);
        
        // Split and append arrays
        const sizesArray = editForm.sizes.split(',').map(size => size.trim());
        const depthsArray = editForm.depths.split(',').map(depth => depth.trim());
        
        sizesArray.forEach((size) => {
            formData.append('size[]', size);
        });
        
        depthsArray.forEach((depth) => {
            formData.append('depth[]', depth);
        });
        
        if (editForm.image) {
            formData.append('image', editForm.image);
        }

        try {
            const response = await axios.put(`${apiUrl}/pools/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            // Update local state
            setPools(prevPools => 
                prevPools.map(pool => 
                    pool.id === id ? response.data : pool
                )
            );
            setEditingPool(null);
            fetchPools();
        } catch (err) {
            console.error('Error updating pool:', err);
        }
    };

    const fetchPools = async () => {
        try {
            const res = await axios.get<Pool[]>(`${apiUrl}/allpools`);
            console.log(res.data);
            setPools(res.data);
        } catch (err) {
            
        } finally {

        }
    };

    useEffect(() => {
        fetchPools();
    }, [])

    const handleClickAddPool = () => {
        setIsAddPoolModalOpen(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setNewPool(prevState => ({ ...prevState, [id]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewPool(prevState => ({ ...prevState, image: e.target.files![0] }))
            fetchPools();
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPool.name == '' || newPool.description == '' || newPool.depths == '' || newPool.sizes == '' || !newPool.image) return;

        const formData = new FormData();
        formData.append('name', newPool.name);
        formData.append('description', newPool.description);
        
        // Split the strings and send as separate array elements
        const sizesArray = newPool.sizes.split(',').map(size => size.trim());
        const depthsArray = newPool.depths.split(',').map(depth => depth.trim());
        
        // Append each array element individually
        sizesArray.forEach((size) => {
            formData.append('size[]', size);
        });
        
        depthsArray.forEach((depth) => {
            formData.append('depth[]', depth);
        });
        
        formData.append('image', newPool.image);

    
        try {
            const response = await axios.post(`${apiUrl}/addpool`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Added pool:', response.data);
            setPools(prevPools => [...prevPools, { ...response.data, id: Date.now().toString() }]);
            setIsAddPoolModalOpen(false);
            setNewPool({ name: '', description: '', sizes: '', depths: '', image: null });
            fetchPools();
        } catch (err) {
            console.error('Error adding pool', err);
        }
    };

    

    const handleDelete = async (id: string) => {
        // Add confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this pool? This action cannot be undone.');
        
        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`${apiUrl}/pools/${id}`);
            setPools(pools.filter(pool => pool.id !== id));
            fetchPools();
        } catch (err) {
            console.error('Error deleting pool', err);
        }
    }

    return (
        <div className='pools-container'>
            <TitleDesc tag='piscines' />
            <div className='pools-pool-container'>
            {
                pools.map((pool) => (
                    editingPool === pool.id ? (
                        <div className='modal-overlay' onClick={() => setEditingPool(null)}>
                            <div className='modal-content' onClick={e => e.stopPropagation()}>
                                <div className='modal-header'>
                                    <h2>Edit Pool</h2>
                                    <button 
                                        className='modal-close' 
                                        onClick={() => setEditingPool(null)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <form className='modal-form'>
                                    <div>
                                        <label htmlFor='edit-name'>Name</label>
                                        <input
                                            id='edit-name'
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='edit-description'>Description</label>
                                        <textarea
                                            id='edit-description'
                                            value={editForm.description}
                                            onChange={(e) => setEditForm(prev => ({...prev, description: e.target.value}))}
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='edit-sizes'>Sizes</label>
                                        <input
                                            id='edit-sizes'
                                            type="text"
                                            value={editForm.sizes}
                                            onChange={(e) => setEditForm(prev => ({...prev, sizes: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='edit-depths'>Depths</label>
                                        <input
                                            id='edit-depths'
                                            type="text"
                                            value={editForm.depths}
                                            onChange={(e) => setEditForm(prev => ({...prev, depths: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='edit-image'>New Image (optional)</label>
                                        <input
                                            id='edit-image'
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setEditForm(prev => ({
                                                ...prev, 
                                                image: e.target.files ? e.target.files[0] : null
                                            }))}
                                        />
                                    </div>
                                    <div className="edit-form-buttons">
                                        <button type="button" onClick={() => handleUpdate(pool.id)}>Save Changes</button>
                                        <button type="button" onClick={() => setEditingPool(null)}>Cancel</button>
                                        <button 
                                            type="button"
                                            className="delete-button"
                                            onClick={() => {
                                                handleDelete(pool.id);
                                                setEditingPool(null);
                                            }}
                                        >
                                            Delete Pool
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <PoolContainer
                            key={pool.id}
                            id={pool.id}
                            poolname={pool.name}
                            description={pool.description}
                            sizes={pool.sizes}
                            depths={pool.depths}
                            image={pool.image}
                            handleEdit={() => handleEdit(pool)}
                        />
                    )
                ))
            }
            </div>

            {
                isAdmin && <button className='pools-add-button' onClick={handleClickAddPool}>Add new pool</button>
            }

            {
                isAddPoolModalOpen && isAdmin && (
                    <div className='modal-overlay' onClick={() => setIsAddPoolModalOpen(false)}>
                        <div className='modal-content' onClick={e => e.stopPropagation()}>
                            <div className='modal-header'>
                                <h2>Add New Pool</h2>
                                <button 
                                    className='modal-close' 
                                    onClick={() => setIsAddPoolModalOpen(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <form className='modal-form' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor='name'>Name</label>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Name'
                                        value={newPool.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='description'>Description</label>
                                    <textarea
                                        id='description'
                                        placeholder='Description'
                                        value={newPool.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='sizes'>Sizes</label>
                                    <input
                                        id='sizes'
                                        type='text'
                                        placeholder='Sizes (comma separated)'
                                        value={newPool.sizes}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='depths'>Depths</label>
                                    <input
                                        id='depths'
                                        type='text'
                                        placeholder='Depths (comma separated)'
                                        value={newPool.depths}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='image'>Image</label>
                                    <input
                                        id='image'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <button type='submit'>Add Pool</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Pools;