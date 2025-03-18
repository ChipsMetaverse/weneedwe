import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { useClickAway } from '@/hooks/useClickAway';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your community support assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);

  useClickAway(chatCardRef, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the OpenAI API
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate response based on user input
      let responseContent = '';
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes('donate') || lowerInput.includes('donation')) {
        responseContent = 'You can make a donation by clicking the "Donate" button in the navigation bar. We accept various payment methods including credit card and PayPal. All donations directly support our community programs.';
      } else if (lowerInput.includes('event') || lowerInput.includes('events')) {
        responseContent = 'We host various community events throughout the year. Check our Events page for upcoming activities, or sign up for our newsletter to receive updates.';
      } else if (lowerInput.includes('volunteer') || lowerInput.includes('help')) {
        responseContent = 'We appreciate your interest in volunteering! Please visit our "Get Involved" page to see current volunteering opportunities, or contact us directly using the form on our Contact page.';
      } else if (lowerInput.includes('service') || lowerInput.includes('program')) {
        responseContent = 'We offer a range of services including educational support, health initiatives, food assistance, and community development programs. Visit our Services page for more information about each program.';
      } else {
        responseContent = 'Thank you for your message. If you have specific questions about our services, donation options, or community events, please let me know and I\'ll be happy to provide more information.';
      }
      
      const assistantMessage = { role: 'assistant' as const, content: responseContent };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div 
          ref={chatCardRef}
          className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 rounded-lg shadow-xl z-50 flex flex-col"
        >
          <Card className="h-full flex flex-col">
            <CardHeader className="py-3 px-4 border-b flex flex-row justify-between items-center">
              <div className="font-medium">Community Support</div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="p-3 border-t">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;