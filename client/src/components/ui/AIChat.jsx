"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendAIMessage } from '@/lib/api';

const AIChat = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]); // Initialize messages as an empty array
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await sendAIMessage(input);
      const aiResponse = { text: response.data.reply, isUser: false };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error sending AI message:', error);
      const errorResponse = { text: "Sorry, I'm having trouble responding right now. Please try again later.", isUser: false };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    }
  };

  return (
    <Card className="my-12">
      <CardHeader>
        <CardTitle>{t('AI Travel Assistant')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder={t('Type your message...')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>{t('Send')}</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChat;
