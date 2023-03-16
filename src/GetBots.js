import React from "react";
import { useState, useEffect } from "react";
import "./css/downlist.css";
import GetBotAS from "./GetBotAS";

function GetBots() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }, []);

  function fetchData() {
    return fetch(`${process.env.REACT_APP_API_URL}bots/allowed/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при запросе данных");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  let list = [];
  data.forEach((element) => {
    list.push({ key: element["name"], value: element["guid"] });
  });
  console.log("🚀 ~ file: GetBots.js:40 ~ list:", list);
  return <GetBotAS options={list} />;
}

export default GetBots;
