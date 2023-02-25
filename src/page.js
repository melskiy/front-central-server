import React, { Component} from 'react';
import './css/Chat.css';
import GetIntents from './GetList';


class Chat extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      messages: [],
      inputValue: ''
    };
    this.handleMessageSend = this.handleMessageSend.bind(this);
  
  }
 
 
      
    
  handleMessageSend() {
    const { messages, inputValue } = this.state;
    this.setState({
      messages: [...messages, inputValue],
      inputValue: ''
    });
  }


  render() {
    let { messages, inputValue } = this.state;
    return (

       <div className='all'> <div className='list'><GetIntents /></div>
      <div className="chat-container">

        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className="message">{message}</div>
          ))}
        </div>
        <div className="input-container">
          <input
            className="input"
            type="text"
            value={inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          />
          <button className="send-button" onClick={this.handleMessageSend}>Send</button>
        </div>
      </div>
      </div>
    );
  }
}

  
export default Chat;