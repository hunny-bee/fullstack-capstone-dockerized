"use client";

import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          💬
        </button>
      )}
      {isOpen && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          width: '20rem',
          height: '24rem',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f3f3f3',
            borderRadius: '0.5rem 0.5rem 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0 }}>Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
          </div>
          <div style={{
            flexGrow: 1,
            padding: '1rem',
            overflowY: 'auto',
            borderBottom: '1px solid #ddd'
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  textAlign: message.sender === 'user' ? 'right' : 'left',
                  marginBottom: '0.5rem'
                }}
              >
                <span style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  backgroundColor: message.sender === 'user' ? '#007bff' : '#f3f3f3',
                  color: message.sender === 'user' ? 'white' : 'black'
                }}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ padding: '1rem', borderTop: '1px solid #ddd' }}>
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flexGrow: 1,
                  marginRight: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ddd'
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
