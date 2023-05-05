import { React, useState } from "react";
import "./css/LogoutButton.css";
import "./css/learn.css";
import Preload from "./preload.gif";

function LearnButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const guid = localStorage.getItem("guid");
    if(guid){
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
        setLoading(false);
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
    }else{
      setLoading(false);
    }
    
  };

  return (
    <div>
      {!loading ? (
        <button onClick={handleClick} className="learn-button">
          Обучить
        </button>
      ) : (
        <button className="learn-button">
          <img className="preload" src={Preload} width="80" alt="Загрузка..." />
        </button>
      )}
    </div>
  );
}

export default LearnButton;
