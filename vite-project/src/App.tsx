import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Input from './components/input/Input'
import Message from './components/message/Message'
import { invoke } from '@tauri-apps/api/core'

function App() {

  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  interface Message {
    text: string;
    isUser: boolean;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (text === '') return;
    setMessages(prevMessages => [...prevMessages, { text: text, isUser: true }]);

    try {
      const response: string = await invoke('chat_response', { userMessage: text });
      setMessages(prevMessages => [...prevMessages, { text: response, isUser: false }]);
      setText('');
    } catch (error) {
      console.error('Error with reponse: ', error);
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const container = document.querySelector('.msgs');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  return (
    <div className="container">
      <Header isOpen={isOpen} toggle={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
      <div className={"msgs " + (isOpen ? "open" : "close")}>
        {messages.map((msg, i) =>
          <Message key={i} text={msg.text} isUser={msg.isUser} />
        )}
      </div>

      <div className={"inner " + (isOpen ? "open" : "close")}>
        <Input text={text} setText={setText} handleSend={handleSend} />
      </div>

    </div>
  )
}

export default App
