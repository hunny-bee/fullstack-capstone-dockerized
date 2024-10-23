"use client"; // Required for stateful components in Next.js

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X } from 'lucide-react';
import axios from 'axios';

const ChatBot = () => {
  const { t } = useTranslation(); // For i18n support
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const API_KEY = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY; // Use environment variable

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add the user's message to the chat
    setMessages([...messages, { text: input, user: true }]);
    setInput(''); // Clear input field

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
        { inputs: input },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botReply = response.data.generated_text;
      setMessages((prev) => [...prev, { text: botReply, user: false }]);
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      setMessages((prev) => [
        ...prev,
        { text: t('Sorry, I encountered an error. Please try again later.'), user: false },
      ]);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 bg-teal-500 text-white rounded-full p-3 shadow-lg hover:bg-teal-600 transition-colors duration-300"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-teal-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">{t('Staycation Assistant')}</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${msg.user ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`${
                    msg.user ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'
                  } inline-block px-4 py-2 rounded-lg max-w-xs`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('Type your message...')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors duration-300"
            >
              {t('Send')}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
