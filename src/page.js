import React, { Component } from "react";
import Chat from "./Chat.js"
import GetBots from "./GetBots.js";
import ButtonReg from "./button_reg";
import Logout from "./Logout_button";
import Learn from "./learnbutton";
class Page extends Component {
  render() {
    return (
      <div className="page">
        <div className="list">
          <div className="main">
            <ButtonReg />
          </div>
          <GetBots />
          <Learn/>
        </div>
        <Logout />
        
        <Chat />
      </div>
    );
  }
}

export default Page;
