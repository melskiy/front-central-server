import React, { useState } from "react";
import "./css/form.css";

function DoIntents(props) {
  const { clicked, intent } = props;
  const [showComponent, setShowComponent] = useState(clicked);

  const Form = () => {
    const [formData, setFormData] = useState({
      name: intent["name"],
      answer: intent["answer"],
      examples: intent["examples"].map(ex => ex["text"]).join("\n"),
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
        return fetch(
          `${process.env.REACT_APP_API_URL}intents/form/${localStorage.getItem("guid")}/${encodeURIComponent(intent["name"])}`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData["name"],
              answer: formData["answer"],
              rank: rang,
              bot_guid: localStorage.getItem("guid"),
              examples: formData["examples"]
                .split(/\r?\n/)
                .map((ex) => ex.trim())
                .filter((ex) => ex !== ""),
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Ошибка при запросе данных");
            }
            return response.json();
          })
          .then((data) => {
            console.log("🚀 ~ file: button_reg.js:57 ~ .then ~ data:", data);
            return data;
          })

          .catch((error) => {
            console.error(error);
          });
      }
      fetchData();
      e.preventDefault();
    };

    if (isSubmitted || !clicked) {
      setShowComponent(false);
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
              value={formData.name}
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
              value={formData.answer}
              name="answer"
              placeholder="Ответ бота"
              required={true}
              min={1}
              onChange={handleChange}
            />
          </label>

          {!isChecked && (
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
  return <div>{showComponent && <Form />}</div>;
}

export default DoIntents;
