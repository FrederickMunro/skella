import { useState } from "react";
import { FaEdit } from 'react-icons/fa';
import EditModal, { Item } from "./EditModal";

import '../PageContainer.css';

interface Props {
  items: Item[];
  submit: Function;
  remove?: Function;
  children: React.ReactNode;
}

const EditableComponent = ({ items, submit, remove, children }: Props) => {

  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [isHovered, setIsHovered] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return(
    <>
        <div 
          className={`editable-container ${isAdmin && isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => isAdmin && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => isAdmin && setIsModalOpen(true)}
          style={{ cursor: isAdmin ? 'pointer' : 'default' }}
        >
          {
            isAdmin && isHovered && (
              <div className="editable-container-edit-overlay">
                <FaEdit/>
              </div>
            )
          }
          {children}
        </div>
      {
        isAdmin && isModalOpen &&
        <EditModal items={items} submit={submit} remove={remove} close={() => setIsModalOpen(false)} />
      }
    </>
  )
}

export default EditableComponent;