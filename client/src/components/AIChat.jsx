import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X } from 'lucide-react';

export default function AIChat({ isSignedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isSignedIn && messages.length === 0) {
      setMessages([{ text: "Hello! How can I assist you with Staycation today?", sender: 'bot' }]);
    }
  }, [isSignedIn]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      const botMessage = { text: data.reply, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!isSignedIn) return null;

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 rounded-full p-3"
        >
          <MessageCircle size={24} />
        </Button>
      )}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-[#fadb5e] shadow-lg rounded-lg overflow-hidden">
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          <div className="h-80 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-white'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow mr-2"
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
