import React, { useState } from "react";
import "./css/Column.css";
import EditButton from "./EditButton";

const Button = ({ text }) => (
  <button className="custom-btn btn-2">{text}</button>
);

function ButtonList({ list }) {
  const [Delete, setDelete] = useState([]);

  const showChild = (i) => {
    setDelete([...Delete, i]);
    fetch(
      `${process.env.REACT_APP_API_URL}intents/form/${localStorage.getItem("guid")}/${encodeURIComponent(i)}`,
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
