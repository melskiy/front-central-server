import React, { useState } from 'react';
import './css/EditButton.css';
import DoIntents from './DoingInents';

const EditButton = ({ onClick }) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };
  return (
  
    <div className='buttons-left'>
    <button className="edit-button" onClick={handleClick}>
      <i className="fas fa-edit">✏️</i>
    </button>
    <button className="delete-button" onClick={onClick}>
      <i className="fas fa-edit">🗑️</i>
    </button>
    {showComponent && <DoIntents />}
    </div>
  );
};

export default EditButton;