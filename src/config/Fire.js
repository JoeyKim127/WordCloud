import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAPcYZpgWMa0xIa2et_5kTqMoF3kkZXu-8",
    authDomain: "wordcloud-a7c93.firebaseapp.com",
    databaseURL: "https://wordcloud-a7c93.firebaseio.com",
    projectId: "wordcloud-a7c93",
    storageBucket: "wordcloud-a7c93.appspot.com",
    messagingSenderId: "350797231931",
    appId: "1:350797231931:web:55310d77c8af854a04e91e",
    measurementId: "G-M38N8Q0GY5"
  };

  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  
  export default fire; 