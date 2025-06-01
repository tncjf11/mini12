// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase 구성 정보 (방금 Firebase에서 받은 거)
const firebaseConfig = {
  apiKey: "AIzaSyC02t0ImJLcUDUmFoFLkeB9dnMrp-AZyMU",
  authDomain: "final-e88f6.firebaseapp.com",
  projectId: "final-e88f6",
  storageBucket: "final-e88f6.firebasestorage.app",
  messagingSenderId: "536548690691",
  appId: "1:536548690691:web:7c5b4520fc864cd1973736"
};


// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 인증, DB 인스턴스 추출
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
