import React from 'react';
import './css/EditButton.css';
const EditButton = ({ onClick }) => {
  return (
    <button className="edit-button" onClick={onClick}>
      <i className="fas fa-edit">✏️</i>
    </button>
  );
};

export default EditButton;