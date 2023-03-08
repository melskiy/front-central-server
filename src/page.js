
import React, { Component } from "react";
import Chat from "./Chat";
import GetBots from "./GetBots.js";
import ButtonReg from "./button_reg";

class Page extends Component {
 
  render() {
    return(

      <div className="page">
    
      <div className="list">
      <div className="main">
      <div>🤖 Намерения <ButtonReg/></div>
      </div><GetBots/></div>

        <Chat/>
   </div>
    );
  }
}

export default Page;