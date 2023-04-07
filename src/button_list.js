import React, { useState } from "react";
import "./css/Column.css";
import EditButton from "./editbotton";
const Button = ({ text }) => (
  <button className="custom-btn btn-2">{text}</button>
);

function ButtonList({ list }){
  const [showComponent, setShowComponent] = useState([]);
  const showChild = (i) => (
    setShowComponent(
      [...showComponent, i],
    )
  );
  
  
  return(
  <div className="yuy">
    {list?.map((item, index) => {
      
      if(item !== "" && !(index in showComponent) ){
        return(
        <div className="edit" id="editing">
         <Button text={item} key={index} /> <EditButton index = {index}  showChild = {showChild}/>
        </div>)
      }else{
        return(
        <div></div>
        )
      }
     
    })}
  </div>
  );
}

export default ButtonList;
