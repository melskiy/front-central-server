import React, { useState } from "react";
import "./css/Column.css";
import EditButton from "./EditButton";
import ButtonColorChange from "./ColorChange";

function handleClick(text) {
  console.log("sss");
  if (text !== localStorage.getItem("predicted")) {
    fetch(
      `${process.env.REACT_APP_API_URL}ml/step/${localStorage.getItem(
        "guid"
      )}/${text}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bot_guid: localStorage.getItem("guid"),
          intent_name: text,
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
        console.log("step", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  ButtonColorChange(false);
}

function Button({ text }) {
  return text[0] === "/" ? (
    <button className="custom-btn btn-2">{text}</button>
  ) : (
    <button
      className="custom-btn btn-2 intent"
      onClick={handleClick.bind(null, text)}
    >
      {text}
    </button>
  );
}

function ButtonList({ list }) {
  const [Delete, setDelete] = useState([]);

  const showChild = (i) => {
    setDelete([...Delete, i]);
    fetch(
      `${process.env.REACT_APP_API_URL}intents/form/${localStorage.getItem(
        "guid"
      )}/${encodeURIComponent(i)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при запросе данных");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="yuy">
      {list?.map((item) => {
        if (item !== "" && !Delete.find((str) => str === item)) {
          return (
            <div key={item} className="edit" id="editing">
              <Button text={item} key={item} />{" "}
              <EditButton item={item} showChild={showChild} />
            </div>
          );
        } else {
          return <div key={item}></div>;
        }
      })}
    </div>
  );
}

export default ButtonList;
