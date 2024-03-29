import React, { useState } from "react";
import "./css/EditButton.css";
import DoIntents from "./DoIntents";

function EditButton(props) {
  const { showChild, intent } = props;
  const [showComponent, setShowComponent] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setShowComponent(true);
  };

  const empty_div = () => {
    setShowComponent(false);
    setClicked(false);
  };

  return (
    <div className="intent-action">
      <div className="buttons-left">
        <button
          className="edit-button"
          onClick={clicked ? empty_div : handleClick}
        >
          <i className="fas fa-edit">✏️</i>
        </button>
        <button className="delete-button" onClick={() => showChild(intent["name"])}>
          <i className="fas fa-edit">🗑️</i>
        </button>
      </div>
      {showComponent && <DoIntents clicked={clicked} intent={intent} />}
    </div>
  );
}

export default EditButton;
