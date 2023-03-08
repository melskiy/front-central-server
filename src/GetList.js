import React, { useState, useEffect } from "react";
import ButtonList from "./button_list";

 function GetIntents() {
 
  const [data, setData] = useState([null]);
  let [guid] = useState('');
    guid = localStorage.getItem('guid');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:11000/bots/intents/${guid}`, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
          },
        });
        if (!response.ok)
          throw new Error("Ошибка при запросе данных");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
     

    
  },[guid]);



  let values = Object.values(data);
  console.log("🚀 ~ file: GetList.js:37 ~ GetIntents ~ values:", values)

  return (<div className="puka"> <ButtonList list={values} /> </div>);  
}  



export default GetIntents;