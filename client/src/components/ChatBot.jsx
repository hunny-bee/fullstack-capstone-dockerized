'use client';

import { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State to toggle chat bubble visibility

    const sendMessage = async () => {
        if (!input) return;

        const userMessage = { inputs: input }; // Adjust based on the API's expected input structure
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('https://api-inference.huggingface.co/models/YOUR_MODEL_NAME', userMessage, {
                headers: {
                    Authorization: `Bearer YOUR_HUGGINGFACE_API_TOKEN` // Replace with your Hugging Face API token
                }
            });
            const botMessage = response.data.generated_text || response.data.reply; // Adjust based on the API's response structure
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botMessage }]);
        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Chatbot Toggle Button (Bubble) */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: '#fadb5e', // Bubble background color
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    zIndex: '1000',
                }}
                onClick={() => setIsOpen(!isOpen)} // Toggle chat window
            >
                💬
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '20px',
                    background: 'white',
                    borderRadius: '10px',
                    padding: '10px',
                    width: '300px',
                    maxHeight: '400px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    zIndex: '1000',
                }}>
                    <h3>TobyAi</h3>
                    <div style={{ maxHeight: '250px', overflowY: 'scroll', marginBottom: '10px' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right' }}>
                                <strong>{msg.sender === 'bot' ? 'TobyAi:' : 'You:'}</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        style={{
                            backgroundColor: '#fadb5e',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '5px',
                            width: '100%',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
