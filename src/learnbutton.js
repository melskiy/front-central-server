import {React, useState} from "react";
import "./css/LogoutButton.css";
import "./css/learn.css"
import Preload from "./preload.gif";

function Learn() {
  const [loading, setloading] = useState(false)
  const handleClick = () => {
    setloading(true)
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
        setloading(false)
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
      {!loading ? <button onClick={handleClick}  className="learnbutton">
    Обучить
      </button> : <button className="learnbutton"><img className="preload" src={Preload} width='80' alt="Загрузка..."/></button>}
    </div>
  );
}

export default Learn;


