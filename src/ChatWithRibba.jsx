import { useState, useEffect, useRef } from 'react';
import styles from './ChatWithRibba.module.css';
import useChatbox from './eventHandler';
import { checkMessage } from './component/checkMessage';

const ribbaAvatar = "https://i.pinimg.com/736x/ad/39/25/ad392542df831f9fea026691d1ecec67.jpg";
const notificationSound = new Audio('/graduation-invite/notice.mp3');


export default function ChatWithRibba({ setInvitationInfo , inEnglish }) {
  const { textareaRef } = useChatbox();
  const chatboxMessageContentRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);

  async function handleUserMessage(message) {
    const data = checkMessage(message);
    addReplyMessage(inEnglish ? data.reply[1] : data.reply[0]);

    if (setInvitationInfo) {
      setTimeout(() => {
        setInvitationInfo(data)
      }, 2500);
    }
  }

  useEffect(() => {
    const handleUserInteract = () => setUserInteracted(true);
    window.addEventListener('click', handleUserInteract, { once: true });
    window.addEventListener('keydown', handleUserInteract, { once: true });
    return () => {
      window.removeEventListener('click', handleUserInteract);
      window.removeEventListener('keydown', handleUserInteract);
    };
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInteracted) {
        notificationSound.play();
      }
      const initialMessage = inEnglish ?
        'Tôi là Ribba - trợ lý của giám đốc roba!\nVui lòng nhập mã lịch hẹn nếu bạn đã đặt lịch trước đó!' :
        'I am Ribba - Roba\'s assistant!\nPlease enter the appointment code if you have scheduled an appointment before!';
      setMessages([{
        text: initialMessage,
        type: "receive"
      }]);
      scrollBottom();
    }, 1000);

    return () => clearTimeout(timer);
  }, [userInteracted]);

  function writeMessage(e) {
    e.preventDefault();

    const messageText = textareaRef.current.value.trim().replace(/\n/g, '<br>\n');
    if (!messageText) return;

    const newMessage = {
        text: messageText,
        type: "sent"
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setNewMessage(newMessage);
    setTimeout(scrollBottom, 50);
    
    textareaRef.current.value = '';
    textareaRef.current.style.height = 'auto';
    textareaRef.current.rows = 1;

    handleUserMessage(messageText).catch(err => {
      console.error("Error handling user message:", err);

      addReplyMessage(inEnglish ? 
        "Xin lỗi nha nhưng mà tui hết giờ làm rồi!" :
        "Sorry but I'm off work now!");
    });
  }

  const addReplyMessage = (out) => {
    const newMessage = {
      text: out,
      type: "receive"
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setTimeout(scrollBottom, 50);

    // Play sound only if user has interacted
    if (userInteracted) {
      notificationSound.play();
    }
  };

  function scrollBottom() {
    const chatboxMessageContent = chatboxMessageContentRef.current;
    if (chatboxMessageContent) {
      chatboxMessageContent.scrollTop = chatboxMessageContent.scrollHeight;
    }
  }

  useEffect(() => {
    if (newMessage) {
      const lastMessage = newMessage.text;
      setNewMessage(null);
      }
  }, [newMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      writeMessage(e);
    }
  };

  return (
    <div className={styles.chatboxWrapper}>
      <div className={styles.chatboxHeader}>
        <div className={styles.chatboxHeaderContainer}>
          <img src={ribbaAvatar} alt="Ribba avatar" className="w-10 h-10 rounded-full border border-white shadow-sm" />
          <div className={styles.chatboxHeaderInfo}>
            <div className="font-semibold text-gray-700">Ribba</div>
            <div className="text-xs text-gray-400">{inEnglish ? "Trợ lý cấp cao" : "Senior Assistant"}</div>
          </div>
        </div>
      </div>
      <div className={styles.chatboxMessageContent} ref={chatboxMessageContentRef}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.chatboxMessageItem} ${styles[message.type]}`}>
            <span className={styles.chatboxMessageItemText} dangerouslySetInnerHTML={{ __html: message.text }} />
          </div>
        ))}
      </div>
      <div className={styles.chatboxMessageBottom}>
        <form className={styles.chatboxMessageForm} onSubmit={writeMessage}>
          <textarea rows="1" placeholder={inEnglish ? 'Enter...' : 'Nhập...'} className={styles.chatboxMessageInput} ref={textareaRef} onKeyDown={handleKeyDown}></textarea>
        </form>
      </div>
    </div>
  );
}