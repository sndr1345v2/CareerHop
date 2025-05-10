import React, { useState } from "react";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "support",
      text: "Hello! How can I help you today?",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      sender: "user",
      text: "I'm looking for resources on machine learning for beginners. Can you help?"
    },
    {
      sender: "support",
      text: "Absolutely! We have several beginner-friendly resources on machine learning. I recommend starting with \"Introduction to Machine Learning for Engineers\" in our learning library. Would you like me to send you a direct link?",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { sender: "user", text: message }]);
    
    // Simulate response (in a real app, this would be an API call)
    setTimeout(() => {
      setChatHistory(prevChat => [
        ...prevChat, 
        { 
          sender: "support", 
          text: "I'll help you find that information. Let me look into our resources section for you.", 
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
        }
      ]);
    }, 1000);
    
    setMessage("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative">
        {isOpen && (
          <div id="chat-widget" className="bg-white rounded-lg shadow-lg w-80 mb-4">
            <div className="bg-primary-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="font-medium">Live Support</h3>
              </div>
              <button 
                className="text-white hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 h-80 overflow-y-auto border-b border-gray-200">
              <div className="space-y-4">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex items-end ${msg.sender === 'support' ? '' : 'justify-end'}`}>
                    {msg.sender === 'support' && msg.avatar && (
                      <img src={msg.avatar} alt="Support agent" className="w-6 h-6 rounded-full order-1" />
                    )}
                    <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${msg.sender === 'support' ? 'order-2 items-start' : 'order-1 items-end'}`}>
                      <div>
                        <span className={`px-4 py-2 rounded-lg inline-block ${msg.sender === 'support' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'}`}>
                          {msg.text}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSendMessage} className="p-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..." 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
        
        <button 
          className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
