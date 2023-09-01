import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

const firebaseSignUp = async ({ name, email, password, photo }) => {
  // 2. email, password로 유저를 만든다.
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
  return { name: user.displayName, email: user.email, photoURL: user.photoURL }
}

const useAuth = () => {
  return getAuth(app)
}

export { useAuth }

// 'firestore'를 export
export { app, auth, db, storage, firebaseSignUp, ref, getDownloadURL }
