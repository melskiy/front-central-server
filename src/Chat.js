import React, { Component } from "react";
import "./css/Chat.css";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      inputValue: "",
    };
    this.handleMessageSend = this.handleMessageSend.bind(this);
  }

  handleMessageSend() {
    const { messages, inputValue } = this.state;

    if (inputValue !== "") {
      fetch(`${process.env.REACT_APP_API_URL}admin_chat/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bot_guid: localStorage.getItem("guid"),
          message: inputValue,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка при запросе данных");
          }
          return response.json();
        })
        .then((data) => {})

        .catch((error) => {
          console.error(error);
        });
    }

    if (inputValue !== "") {
      this.setState({
        messages: [...messages, inputValue],
        inputValue: "",
      });
    } else {
      this.setState({
        inputValue: "",
      });
    }
  }

  render() {
    let { messages, inputValue } = this.state;
    return (
      <div className="all">
        <div className="list"></div>
        <div className="chat-container">
          <div className="message-container">
            {messages.map((message, index) => (
              <div key={index} className="message">
                {message}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              className="input"
              type="text"
              value={inputValue}
              onChange={(e) => this.setState({ inputValue: e.target.value })}
            />
            <button className="send-button" onClick={this.handleMessageSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
