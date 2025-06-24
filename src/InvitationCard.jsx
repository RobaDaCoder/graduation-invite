import React, { useState, useEffect, useRef } from 'react';
import styles from './InvitationCard.module.css';

const img_friend_path = "/avatars/";

export default function InvitationCard({ info , inEnglish }) {
  const name = info?.name || "Những người mà Bảo iu quý";
  const key = info?.key || "seeto";
  const pronoun = info?.pronoun || "cả nhà";
  const note = info?.note || "Rất mong gặp được cả nhà mình tại ngày tốt nghiệp của Bảo!";
  const fetch = info?.fetch || false;

  return (
    <div className={styles.invitationCardBackground}>
      <div className={styles.invitationCard}>
        <svg>
          <defs>
            <mask id="mask">
              <rect/>
              <text x="27%" text-anchor="middle" y="50vh" dy="0">r</text>
              <text x="40%" text-anchor="middle" y="50vh" dy="0">o</text>
              <text x="57%" text-anchor="middle" y="50vh" dy="0">b</text>
              <text x="72%" text-anchor="middle" y="50vh" dy="0">a</text>
            </mask>
          </defs>
          <rect/>
        </svg>
        <div className={styles.invitationCardHeader}>
            <div className={styles.graduation}><b>gr<span>a</span>d<span>ua</span>t<span>io</span>n</b></div>
        </div>
        <div className={styles.spanContainer}>
          <div className={styles.cardSpan}>{inEnglish ? "thân mời" : "warmly welcome"} "{pronoun}"</div>
          {fetch && (<div className={styles.cardSpanName}>{name}</div>)}
        </div>
        <div className={styles.scheduleContainer}>
          <span>{inEnglish ? "CHỦ NHẬT" : "SUNDAY"}</span>
          <div className={styles.scheduleItem}>
            <span>{inEnglish ? "THÁNG 6" : "JUNE"}</span>
            <span className={styles.scheduleDate}>29</span>
          </div>
          <span>{inEnglish ? "LÚC 11:00" : "11.AM"}</span>
        </div>
        <a className={styles.locationBox} href='https://maps.app.goo.gl/CuzcjdneHbWLHacf7' target="_blank" rel="noopener noreferrer">
          <div className={styles.locationBox__img}></div>
          <span className={styles.locationBox__title}>{inEnglish ? "Trường Đại học KHTN,\nĐHQG-HCM" : "University of Science,\nVNU-HCM"}</span>
          <span className={styles.locationBox__detail}>{inEnglish ? "227 Đ. Nguyễn Văn Cừ, Phường 4, Q.5, TP.HCM" : "227 Nguyen Van Cu St., Ward 4, D.5, HCMC"}</span>
        </a>
      </div>
    </div>
  );
}