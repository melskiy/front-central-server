import React, { useState } from 'react';
import './css/EditButton.css';
import DoIntents from './DoingInents';

function EditButton (props) {
  const { showChild ,index } = props;
  const [showComponent, setShowComponent] = useState(false);
  

  const handleClick = () => {
    setShowComponent(true);
  };


  return (
    <div className='butbut'>
    <div className='buttons-left'>
    <button className="edit-button" onClick={handleClick}>
      <i className="fas fa-edit">✏️</i>
    </button>
    <button className="delete-button" onClick={ () =>showChild(index)}>
      <i className="fas fa-edit">🗑️</i>
    </button>
    </div>

    {showComponent && <DoIntents />}
    </div>
  );
}

export default EditButton;

    