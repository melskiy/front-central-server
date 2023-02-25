import React from 'react';
import './css/Colomn.css';

const Button = ({ text }) => (
  <button className="custom-btn btn-2">{text}</button>
);
 
const ButtonList = ({ list }) => (
  <div className="yuy">
    <p className = 'main'>🤖 Интенты <button className="btn">+</button> </p>
    
    {list?.map((item)=> (
      <Button text={item} />
    ))}
  </div>
);


export default ButtonList;


