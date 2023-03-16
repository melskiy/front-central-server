import React from "react";
import "./css/Column.css";

const Button = ({ text }) => (
  <button className="custom-btn btn-2">{text}</button>
);

const ButtonList = ({ list }) => (
  <div className="yuy">
    {list?.map((item, index) => (
      <Button text={item} key={index} />
    ))}
  </div>
);

export default ButtonList;
