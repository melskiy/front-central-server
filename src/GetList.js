import React, { useState, useEffect } from 'react';
import ButtonList from './Colomn';
function GetIntents() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetchData()
        .then(result => setData(result))
        .catch(error => console.error(error));
    }, []);
  
    function fetchData() {
      return fetch('http://localhost:11000/intents/get')
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при запросе данных');
          }
          return response.json();
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          console.error(error);
        });
      }
     
  
      let values = Object.values(data);;
      console.log(values);
    return (
    
      <ButtonList list = {values[0]}/>
    );
  }
  export default  GetIntents;