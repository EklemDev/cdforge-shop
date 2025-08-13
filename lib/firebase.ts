import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDvJOmqd9mImo34d_uXOHRYpBdCBQmGJO8",
  authDomain: "codeforge-feb17.firebaseapp.com",
  databaseURL: "https://codeforge-feb17-default-rtdb.firebaseio.com",
  projectId: "codeforge-feb17",
  storageBucket: "codeforge-feb17.firebasestorage.app",
  messagingSenderId: "772503721079",
  appId: "1:772503721079:web:ee361d875b5d57b2dee272",
  measurementId: "G-GFEH1GMEXL"
}

// Initialize Firebase only if config is valid and not already initialized
let app
if (firebaseConfig.apiKey && !getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

// Initialize Firestore
export const db = app ? getFirestore(app) : null

// Initialize Analytics (only in browser and if not already initialized)
let analytics = null
if (typeof window !== 'undefined' && app) {
  try {
    analytics = getAnalytics(app)
  } catch (error) {
    console.warn('Analytics initialization failed:', error)
  }
}
export { analytics }

export default app
