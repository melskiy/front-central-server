import React from "react";
import "./css/Column.css";
import EditButton from "./editbotton";
const Button = ({ text }) => (
  <button className="custom-btn btn-2">{text}</button>
);

const ButtonList = ({ list }) => (
  <div className="yuy">
    {list?.map((item, index) => {
      
      if(item !== ""){
        return(
        <div className="edit">
        <Button text={item} key={index} /> <EditButton/>
        </div>)
      }else{
        return(
        <div></div>
        )
      }
     
    })}
  </div>
);

export default ButtonList;
