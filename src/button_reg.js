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
      setIsSubmitted(true);
      console.log(formData);

      function fetchData() {
        let rang = 0;
        if (isChecked) {
          rang = -1;
        }
        return fetch(`${process.env.REACT_APP_API_URL}intents/form`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData["name"],
            answer: formData["answers"],
            rank: rang,
            bot_guid: localStorage.getItem("guid"),
            examples: [formData["examples"]],
          }),
        })
        
          .then((response) => {
            if (!response.ok) {
              throw new Error("Ошибка при запросе данных");
            }
            return response.json();
          })
          .then((data) => {
            console.log("🚀 ~ file: button_reg.js:56 ~ .then ~ data:", data);
            return data;
          })

          .catch((error) => {
            console.error(error);
          });
      }
      fetchData();
      e.preventDefault();
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
        
      <div>
        <React.Fragment><br/></React.Fragment>
      <form className="forma" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={formData.topic}
            name="name"
            placeholder="Название"
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
          <input
            type="text"
            placeholder="Ответы"
            value={formData.title}
            name="answers"
            onChange={handleChange}
          />
        </label>

        <label className="placeholder">
          
          <textarea
             placeholder="Примеры"
            value={formData.examples}
            name="examples"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="submit">
          Отправить
        </button>
      </form>
      </div>
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
