"use client"; 
import { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

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
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'white',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
            <h3>TobyAi</h3>
            <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
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
            />
            <button onClick={sendMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
};

export default ChatBot;
