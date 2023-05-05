
import React, { useState } from "react";
import "./css/form.css";

function ButtonReg() {
  const [showComponent, setShowComponent] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const show = () =>{
    return showWarning && showComponent;
  }

  const handleClick = () => {
    if(localStorage.getItem("guid")){
      setShowComponent(true);
      setClicked(true);
      setShowWarning(true);
    }else{
      setShowWarning(false);
    }
  };

  const empty_div = () => {
    setShowComponent(false);
    setClicked(false);
  };

  return (
    <div className="but">
      🤖 Намерения
      <button onClick={clicked ? empty_div : handleClick} className="btn">
        +
      </button>
      {show() && <Form />}
    </div>
  );
}

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    answers: "",
    examples: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const showform = () => {
    return isChecked;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
          examples: formData["examples"]
            .split(/\r?\n/)
            .map((ex) => ex.trim())
            .filter((ex) => ex !== ""),
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
  };

  if (isSubmitted) {
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
      <form className="forma" onSubmit={handleSubmit}>
        <div className="item">
          <input
            id="c"
            type="checkbox"
            name="command"
            value={formData.command}
            checked={formData.command}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="c">Команда</label>
        </div>

        <label>
          <input
            className="inputs"
            type="text"
            value={formData.topic}
            name="name"
            placeholder="Название"
            onChange={handleChange}
            required={true}
            min={1}
          />
        </label>

        <label>
          <textarea
            className="inputs"
            placeholder="Ответ бота"
            value={formData.title}
            name="answers"
            required={true}
            min={1}
            onChange={handleChange}
          />
        </label>

        {!showform() && (
          <label className="placeholder">
            <textarea
              placeholder="Примеры сообщений для данного ответа"
              value={formData.examples}
              name="examples"
              onChange={handleChange}
            />
          </label>
        )}

        <button type="submit" className="submit">
          Отправить
        </button>
        <hr />
      </form>
    </div>
  );
};


export default ButtonReg;