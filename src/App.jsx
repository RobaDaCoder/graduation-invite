import ChatWithRibba from './ChatWithRibba.jsx';
import styles from './App.module.css'
import React, { useState, useRef, useEffect } from 'react';
import ThemeOption from './component/ThemeOption.jsx';
import InvitationCard from './InvitationCard.jsx';

const letters = "ABCDEFJHIJKLMNOPQRSTUVWXYZ"
const desktopText = "CHÀO MỪNG ĐẾN VỚI NHÀ CỦA ROBA!";
const desktopTextEnglish = "WELCOME TO ROBA'S HOUSE!";
const mobileText = "WELCOME!";
const backgroundMusic = new Audio('../background_music.mp3');

function App() {
  const [invitationInfo, setInvitationInfo] = useState(null);
  const headerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [inEnglish, setInEnglish] = useState(false);
  
  useEffect(() => {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.2;

    // Handler to play music on first user interaction
    const startMusic = () => {
      backgroundMusic.play().catch(error => console.error("Error playing music:", error));
      window.removeEventListener('click', startMusic);
      window.removeEventListener('keydown', startMusic);
    };

    window.addEventListener('click', startMusic);
    window.addEventListener('keydown', startMusic);

    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      window.removeEventListener('click', startMusic);
      window.removeEventListener('keydown', startMusic);
    };
  }, []);

  // Listen to resize, update isMobile
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const label = isMobile ? mobileText : (inEnglish ? desktopText : desktopTextEnglish);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    function onMouseOver(event) {
      let iteration = 0;
      const value = el.dataset.value;
      const interval = setInterval(() => {
        el.innerText = value
          .split("")
          .map((letter, index) => {
            if (index < iteration) return value[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");
        if (iteration >= value.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    }

    el.addEventListener("mouseover", onMouseOver);
    return () => el.removeEventListener("mouseover", onMouseOver);
  }, [isMobile]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.languageContainer}>
        <button className={styles.languageOption} onClick={() => setInEnglish(!inEnglish)}>
          {inEnglish ? "English" : "Tiếng Việt"}
        </button>
      </div>
      <div className="theme-container">
        <ThemeOption/>
      </div>
      <div className={styles.headerContainer}>
        <div className={styles.headerBar}> 
          <div className={styles.headerContent}>
            <span className={styles.headerText} data-value={label} ref={headerRef}>{label}</span>  
          </div>  
        </div>
        <img src="../ghibli.png"/>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoWrapper}>
            <img src="../boss.jpg" onClick={toggleChat}/>
            <span className={styles.welcomeMessage}>{inEnglish ? "Xin chào!": "Hello!"}</span>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTextContent}>roba co.</span>
          </div>
        </div>
        {showChat && (
          <div className={styles.chatContainer}>
            <ChatWithRibba setInvitationInfo={setInvitationInfo} inEnglish={inEnglish}/>
          </div>
        )}
      </div>
      {invitationInfo && <InvitationCard info={invitationInfo} inEnglish={inEnglish}/>}
    </div>
  );
}

export default App
