import { useState } from "react";
import { FaEdit } from 'react-icons/fa';

import './PageContainer.css';

interface Props {
  handleEdit: Function;
  children: React.ReactNode;
}

const EditableComponent = ({ handleEdit, children }: Props) => {

  const isAdmin = import.meta.env.VITE_IS_ADMIN === 'true';

  const [isHovered, setIsHovered] = useState(false);

  return(
    <div 
      className={`editable-container ${isAdmin && isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => isAdmin && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isAdmin && handleEdit()}
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
  )
}

export default EditableComponent;