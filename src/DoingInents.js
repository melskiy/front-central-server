import React, { useState } from "react";
import "./css/form.css";

function DoIntents(){
    const [showComponent, setShowComponent] = useState(false);
    
    const Form = () => {
      const [formData, setFormData] = useState({
        name: "",
        answers: "",
        examples: "",
      });

      function cnel(){
        return(<div></div>)
      }
    
      const [isChecked, setIsChecked] = useState(false);
      const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
      };
    
      const [isSubmitted, setIsSubmitted] = useState(false);
      const handleSubmit = (e) => {
        setIsSubmitted(true);
        console.log(formData);
    
        function fetchData() {
          let rang = 0;
          if (isChecked) {
            rang = -1;
          }
          return fetch(`${process.env.REACT_APP_API_URL}intents/form`, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData["name"],
              answer: formData["answers"],
              rank: rang,
              bot_guid: localStorage.getItem("guid"),
              examples: [formData["examples"]],
            }),
          })
          
            .then((response) => {
              if (!response.ok) {
                throw new Error("Ошибка при запросе данных");
              }
              return response.json();
            })
            .then((data) => {
              console.log("🚀 ~ file: button_reg.js:56 ~ .then ~ data:", data);
              return data;
            })
    
            .catch((error) => {
              console.error(error);
            });
        }
        fetchData();
        e.preventDefault();
      };
    
      if (isSubmitted) {
        setShowComponent(false);
        // setIsSubmitted(false);
        return <div></div>;
      }
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    if (isChecked){
      return (
        
        <div>
          <React.Fragment><br/></React.Fragment>
        <form className="forma" onSubmit={handleSubmit}>
        <div className="item">
            <input 
              id="c"
              type="checkbox"
              name="command"
              value={formData.command}
              checked={formData.command}
              onChange={handleCheckboxChange}

            />
          <label for="c">команда</label>
          </div>

          <label>
            <input className="inputs"
              type="text"
              value={formData.topic}
              name="name"
              placeholder="Название"
              onChange={handleChange}
              required ={true}
              min= {1}
            />
          </label>
        
          
          <label>
            <input className="inputs"
              type="text"
              placeholder="Ответы"
              value={formData.title}
              name="answers"
              required ={true}
              min= {1}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="submit">
            Отправить
          </button>
          
          <button className="cnel" onClick={cnel()}>
            ❌
          </button>
          <hr/>
        </form>
        </div>
      );
    }

      return (
        
        <div>
          <React.Fragment><br/></React.Fragment>
        <form className="forma" onSubmit={handleSubmit}>
        <div className="item">
            <input 
              id="c"
              type="checkbox"
              name="command"
              value={formData.command}
              checked={formData.command}
              onChange={handleCheckboxChange}

            />
          <label for="c">команда</label>
          </div>

          <label>
            <input className="inputs"
              type="text"
              value={formData.topic}
              name="name"
              placeholder="Название"
              onChange={handleChange}
              required ={true}
              min= {1}
            />
          </label>
        
          
          <label>
            <input className="inputs"
              type="text"
              placeholder="Ответы"
              value={formData.title}
              name="answers"
              required ={true}
              min= {1}
              onChange={handleChange}
            />
          </label>
  
          <label className="placeholder">
            
            <textarea
               placeholder="Примеры"
              value={formData.examples}
              name="examples"
              onChange={handleChange}
            />
          </label>
  
          <button type="submit" className="submit">
            Отправить
          </button>
          <button className="cnel" onClick={cnel()}>
            ❌
          </button>
          <hr/>
        </form>
        </div>
      );
    };

    return (
      
        <Form />
       
      );

    } 

export default DoIntents;