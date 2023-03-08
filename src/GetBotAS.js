
import React from "react";
import { useState } from "react";
import GetIntents from "./GetList";


function GetBotAS({ options }) {
  const [selectedOption, setSelectedOption] = useState('');
  let list = options;
  options = []
  list.forEach(element => {
    options.push(element['key']);
  })

  function handleChange(event) {


    list.forEach(element => {
      if (element['key'] === selectedOption) {
        localStorage.setItem('guid', element['value'])
        console.log(element['value'])
      }
    })

    const value = event.target.value;
    setSelectedOption(value);

  }


  return (
    <div className="box">
      <select value={selectedOption} onChange={handleChange} className="select">
        <option value="" > Выбор бота </option>
        {options.map((option, key) => (
          <option key={key} value={option} >
            {option}
          </option>
        ))}

      </select>

      <div>
        {selectedOption && <GetIntents />}
      </div>
    </div>
  );
}

export default GetBotAS;