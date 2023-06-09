import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputText.trim() !== '') {
        sendMessage();
      }
    }
  };

  const sendMessage = async () => {
    try {
      if (inputText.trim() === '') return; // Check if input text is empty
  
      setMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          { text: inputText, sender: 'user' },
        ];
        const chatHistory = updatedMessages.map((message) => message.text).join('\n');
        console.log('sendingMessage function')
        const sendRequest = async () => {
          console.log('sending request')
          const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: chatHistory }),
          });
  
          const data = await response.json();
          const generatedText = data.generated_text;
  
          setMessages((prevMessages) => [
            ...prevMessages,
            ...generatedText.map((text) => ({ text, sender: 'bot' })),
          ]);
        };
  
        sendRequest();
  
        return updatedMessages;
      });
  
      setInputText('');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="container">
      <div className="chat">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        
      </div>
      {isLoading && <div className="loading"></div>}
    </div>
  );
}

export default App;
