import React, { useState } from "react";
import "./css/form.css";

function ButtonReg() {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };

  const Form = () => {
    const [formData, setFormData] = useState({
      name: "",
      answers: "",
      examples: "",
    });

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };

    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitted(true);
      console.log(formData, isChecked);
    };

    if (isSubmitted) {
      setShowComponent(false);
      // setIsSubmitted(false);
      return <div></div>;
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    return (
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            value={formData.topic}
            name="name"
            onChange={handleChange}
          />
        </label>

        <label>
          Команда
          <input
            type="checkbox"
            name="command"
            value={formData.command}
            checked={formData.command}
            onChange={handleCheckboxChange}
          />
        </label>

        <label>
          Ответ:
          <input
            type="text"
            value={formData.title}
            name="answers"
            onChange={handleChange}
          />
        </label>

        <label className="placeholder">
          Примеры:
          <textarea
            value={formData.examples}
            name="examples"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="submit">
          Отправить
        </button>
      </form>
    );
  };

  return (
    <div className="but">
      <button onClick={handleClick} className="btn">
        +
      </button>
      {showComponent && <Form />}
    </div>
  );
}

export default ButtonReg;
