// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCcl0VpZVoZPEuH0ClO476utEx_MPVf8cM",
//   authDomain: "employeeexpress-3d548.firebaseapp.com",
//   projectId: "employeeexpress-3d548",
//   storageBucket: "employeeexpress-3d548.firebasestorage.app",
//   messagingSenderId: "693193553389",
//   appId: "1:693193553389:web:63d882004970711b7ca3e4",
//   measurementId: "G-7T5C10WR4L"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore();

// onAuthStateChanged(auth, (user) => {
//     const loggedInUserId = localStorage.getItem('loggedInUserId');
//     if (loggedInUserId) {
//         console.log('Logged in user ID:', loggedInUserId);
//         const docRef = doc(db, "users", loggedInUserId);
//         getDoc(docRef)
//             .then((docSnap) => {
//                 if (docSnap.exists()) {
//                     const userData = docSnap.data();
//                     document.getElementById('loggedUserFName').innerText = userData.firstName;
//                     document.getElementById('loggedUserEmail').innerText = userData.email;
//                     document.getElementById('loggedUserLName').innerText = userData.lastName;
//                 } else {
//                     console.log("No document found matching ID:", loggedInUserId);
//                 }
//             })
//             .catch((error) => {
//                 console.log("Error getting document:", error);
//             });
//     } else {
//         console.log("User ID not found in local storage");
//     }
// });

// const logoutButton = document.getElementById('logout');

// logoutButton.addEventListener('click', () => {
//     localStorage.removeItem('loggedInUserId');
//     signOut(auth)
//         .then(() => {
//             window.location.href = 'index.html';
//         })
//         .catch((error) => {
//             console.error('Error signing out:', error);
//         });
// });