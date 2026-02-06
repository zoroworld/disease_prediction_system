export default function BotMessage({ children }) {
    return (
      <div className="chat-row bot">
        <div className="avatar">🤖</div>
  
        <div className="bubble bot-bubble">
          {children}
        </div>
      </div>
    );
  }
  