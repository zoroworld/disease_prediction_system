import { createContext, useContext, useState } from "react"

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
