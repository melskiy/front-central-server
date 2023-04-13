import React, { Component } from "react";
import "./css/Chat.css";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      answer: [],
      inputValue: "",
    };
    
    this.handleMessageSend = this.handleMessageSend.bind(this);
  }

  handleMessageSend(event) {
   
    const { messages, inputValue,answer } = this.state;
   
    if (inputValue !== "") {
      
      console.log(localStorage.getItem("token"));
      fetch(`${process.env.REACT_APP_API_URL}admin_chat/answer`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
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
        .then((data) => {
          console.log("🚀 ~ file: chat.js:38 ~ Chat ~ handleMessageSend ~ data:", data)
          this.setState({
            answer: [...answer, data["answer"]],
          });
        })
        

        .catch((error) => {
          console.error(error);
        });
       
        this.setState({
          messages: [...messages, inputValue],
          inputValue: "",
        });
        event.preventDefault();
    } else {
      this.setState({
        inputValue: "",
      });
      event.preventDefault();
    }
  }

  render() {
    let { messages, inputValue, answer} = this.state;
    return (
      <div className="all">
        <div className="list"></div>
        <div className="chat-container">
          <div className="message-container">
            {messages.map((message, index) => {
              return(
                <div key={index} className="message">
                  <div className="user-message" >{message}</div>
                  <div className="bot-answer" key = {index}>{answer[index]}</div>
                </div>
              )
             })}
          </div>
          
          <form className = 'inputform' onSubmit={this.handleMessageSend}>
          <div className="input-container">
            <input
              className="input"
              type="text"
              value={inputValue}
              onChange={(e) => this.setState({ inputValue: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" ? this.handleMessageSend : null}
            />
            <button type = "onSubmit" className="send-button" >
              Send
            </button>
            </div>
            </form>
          
        </div>
      </div>
    );
  }
}

export default Chat;
