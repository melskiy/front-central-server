import React, { useState } from "react";
import Form from "./registerIntent";

function ButtonReg() {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };

  return (
    <div className="but">
      <button onClick={handleClick} className = 'btn'>+</button>
      {showComponent && <Form />}
    </div>
  );
}

export default ButtonReg ;