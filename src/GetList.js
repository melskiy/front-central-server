import React, { useState, useEffect, useMemo } from "react";
import ButtonList from "./ButtonList";
import Chat from "./Chat";
function GetIntents() {
  const chat = useMemo(() => {
    return new Chat();
  }, []);
  const [data, setData] = useState([]);
  let [guid] = useState("");
  guid = localStorage.getItem("guid");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}intents/allowed/${guid}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) throw new Error("Ошибка при запросе данных");
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    chat.History();
  }, [guid, chat]);

  return (
    <div className="puka">
      <ButtonList list={data.map((intent) => intent["name"])} />{" "}
    </div>
  );
}

export default GetIntents;
