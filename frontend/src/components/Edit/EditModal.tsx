import { useEffect, useState } from 'react';
import './EditModal.css';

export interface Item {
    label: string;
    type: string;
    placeholder?: string;
    value: string | [string,string][] | File | null;
    setValue: Function;
}

interface Props {
    items: Item[];
    submit: Function;
    remove?: Function;
    close: Function;
}

const EditModal = ({ items, submit, remove, close }: Props) => {
    const [depths, setDepths] = useState<string>('');
    const [sizes, setSizes] = useState<string>('');
    const [sizeDepth, setSizeDepth] = useState<[string, string][]>([])

    const handleDepthChange = (value: string) => {
        setDepths(value);
    };

    const handleSizeChange = (value: string) => {
        setSizes(value);
    };

    const getInput = (item: Item) => {
        switch(item.type) {
            case 'input':
                return <input
                    className='edit-modal-input'
                    placeholder={item.placeholder}
                    value={item.value as string}
                    onChange={(e) => item.setValue(e.target.value)}
                    type='text'
                />
            case 'textarea':
                return <textarea
                    className='edit-modal-textarea'
                    placeholder={item.placeholder}
                    value={item.value as string}
                    onChange={(e) => item.setValue(e.target.value)}
                    rows={4}
                />;
            case 'image':
                return <div className='edit-modal-image-container'>
                    <img
                        src={item.value as string}
                        alt={item.label}
                        className='edit-modal-image-preview'
                    />
                    <input
                        className='edit-modal-image'
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                            const file = e.target.files?.[0]; // Check if files is not null
                            if (file) {
                                item.setValue(file); // Use item.setValue instead of setValue
                            }
                        }}
                    />
                </div>
            case 'sizedepth':
                return <div>
                    <input 
                        value={sizes} 
                        onChange={(e) => handleSizeChange(e.target.value)} 
                        placeholder="Enter sizes" 
                    />
                    <input 
                        value={depths} 
                        onChange={(e) => handleDepthChange(e.target.value)} 
                        placeholder="Enter depths" 
                    />
                    <button
                        onClick={() => {
                            addSizeDepth();
                            item.setValue([...sizeDepth, [sizes, depths]]);
                        }}
                    >+</button>
                        {
                        sizeDepth.map(item => {
                            return <p>{`sizes: ${item[0]}\tdepths: ${item[1]}`}</p>
                        })
                    }
                </div>
            case 'pdf':
                return <div className='edit-modal-image-container'>
                    <input
                        className='edit-modal-image'
                        type='file'
                        accept='application/pdf'
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                item.setValue(file);
                            }
                        }}
                    />
                </div>
            default:
                return null;
        }
    }

    const addSizeDepth = () => {
        if (sizes && depths) {
            setSizeDepth(prev => [...prev, [sizes, depths]]);
            setSizes('');
            setDepths('');
        }
    };

    return(
        <div className="modal-overlay" onClick={() => close()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='edit-modal-title'>Edit Modal</h2>
                {items.map((item, index) => {
                    return(
                        <div className='edit-modal-item' key={index}>
                            <label className='edit-modal-label'>{item.label}</label>
                            {getInput(item)}
                        </div>
                    )
                })}
                <div className='edit-modal-button-container'>
                    <button className='edit-modal-button edit-modal-button-green' onClick={() => { submit(); close(); }}>Save Changes</button>
                    <button className='edit-modal-button edit-modal-button-clear' onClick={() => close()}>Cancel</button>
                    {
                        remove && <button className='edit-modal-button edit-modal-button-red' onClick={() => remove()}>Delete</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditModal;