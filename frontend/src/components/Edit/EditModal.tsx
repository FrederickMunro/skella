import './EditModal.css';

export interface Item {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    setValue: Function;
}

interface Props {
    items: Item[];
    submit: Function;
    remove?: Function;
    close: () => void;
}

const EditModal = ({ items, submit, remove, close }: Props) => {

    const getInput = (item: Item) => {
        switch(item.type) {
            case 'input':
                return <input
                    className='edit-modal-input'
                    placeholder={item.placeholder}
                    value={item.value}
                    onChange={(e) => item.setValue(e.target.value)}
                    type='text'
                />
            case 'textarea':
                return <textarea
                    className='edit-modal-textarea'
                    placeholder={item.placeholder}
                    value={item.value}
                    onChange={(e) => item.setValue(e.target.value)}
                    rows={4}
                />;
            case 'image':
                return <input
                    className='edit-modal-image'
                    type='file'
                    onChange={(e) => item.setValue(e.target.files ? e.target.files[0] : null)}
                    accept='image/*'
                />;
        }
    }

    return(
        <div className="modal-overlay" onClick={close}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='edit-modal-title'>Edit Modal</h2>
                {
                    items.map((item, index) => {
                        return(
                            <div className='edit-modal-item' key={index}>
                                <label className='edit-modal-label'>{item.label}</label>
                                {getInput(item)}
                            </div>
                        )
                    })
                }
                <div className='edit-modal-button-container'>
                    <button className='edit-modal-button edit-modal-button-green'>Save Changes</button>
                    <button className='edit-modal-button edit-modal-button-clear' onClick={close}>Cancel</button>
                    {
                        remove && <button className='edit-modal-button edit-modal-button-red'>Delete</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditModal;