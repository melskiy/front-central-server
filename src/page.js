import React, { Component } from "react";
import Chat from "./Chat";
import GetBots from "./GetBots";
import ButtonReg from "./ButtonReg";
import LogoutButton from "./LogoutButton";
import LearnButton from "./LearnButton";

class Page extends Component {
  render() {
    return (
      <div className="page">
        <div className="list">
          <div className="main">
            <ButtonReg />
          </div>
          <GetBots />
          <LearnButton />
        </div>
        <LogoutButton />
        <Chat />
      </div>
    );
  }
}

export default Page;
