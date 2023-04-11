import React from "react";
import "./css/LogoutButton.css";
import "./css/learn.css"
function Learn() {
  const handleClick = () => {
    const guid =  localStorage.getItem("guid")
    return fetch(`${process.env.REACT_APP_API_URL}ml/train/${guid}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bot_guid: localStorage.getItem("guid"),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при запросе данных");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })

      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <button onClick={handleClick}  className="learnbutton">
    Обучить
      </button>
    </div>
  );
}

export default Learn;


