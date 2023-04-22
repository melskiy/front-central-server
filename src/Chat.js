import React, {  Component } from "react";
import "./css/Chat.css";
import Preload from "./preload.gif";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      answer: [],
      inputValue: "",
      loading: false,
    };

    this.handleMessageSend = this.handleMessageSend.bind(this);
  }

  handleMessageSend(event) {
    const { messages, inputValue, answer } = this.state;

    if (inputValue !== "") {
      this.setState({ loading: true });
      fetch(`${process.env.REACT_APP_API_URL}admin_chat/answer`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
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
          console.log("🚀 chat.js ~ Chat ~ handleMessageSend ~ data:", data);
          this.setState({
            answer: [...answer, data["answer"]],
            loading: false,
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
      this.setState({ inputValue: "" });
      event.preventDefault();
    }
  }

  render() {
    let { messages, inputValue, answer, loading } = this.state;
    return (
      <div className="all">
        <div className="chat-container">
          <div className="message-container">
            {messages.map((message, index) => {
              return (
                <div key={index} className="message">
                  <div className="user-message">{message}</div>
                  {answer[index] ? (
                    <div className="bot-answer" key={index}>
                      {answer[index]}
                    </div>
                  ) : (
                    <div className="bot-answer">
                      {" "}
                      <img
                        className="preload"
                        src={Preload}
                        width="80"
                        alt="Загрузка..."
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <form className="input-form" onSubmit={this.handleMessageSend}>
            <div className="input-container">
              {!loading ? (
                <input
                  className="input"
                  type="text"
                  value={inputValue}
                  onChange={(e) =>
                    this.setState({ inputValue: e.target.value })
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.handleMessageSend : null
                  }
                />
              ) : (
                <input
                  className="input"
                  type="text"
                  value={inputValue}
                  placeholder="Загрузка..."
                  readOnly={true}
                  onChange={(e) =>
                    this.setState({ inputValue: e.target.value })
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.handleMessageSend : null
                  }
                />
              )}
              <button type="onSubmit" className="send-button">
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
