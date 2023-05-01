import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCnkSwZeV66FxM7brIQWoJoRFOlIHAuM_8",
  authDomain: "boardapp-47607.firebaseapp.com",
  projectId: "boardapp-47607",
  storageBucket: "boardapp-47607.appspot.com",
  messagingSenderId: "980316387658",
  appId: "1:980316387658:web:a0c8da3d607894d4ece9b3",
  measurementId: "G-KDN2S4E1K5"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase