import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcl0VpZVoZPEuH0ClO476utEx_MPVf8cM",
  authDomain: "employeeexpress-3d548.firebaseapp.com",
  projectId: "employeeexpress-3d548",
  storageBucket: "employeeexpress-3d548.firebasestorage.app",
  messagingSenderId: "693193553389",
  appId: "1:693193553389:web:63d882004970711b7ca3e4",
  measurementId: "G-7T5C10WR4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Function to handle job posting form submission
const jobPostingForm = document.getElementById('jobPostingForm');
if (jobPostingForm) {
    jobPostingForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const study = document.getElementById('study').value;
        const contactEmail = document.getElementById('contactemail').value;
        const phoneNumber = document.getElementById('phonenumber').value;
        const datePost = document.getElementById('datepost').value;
        const annualWork = document.getElementById('annualwork').value;

        try {
            await addDoc(collection(db, "jobPostings"), {
                study: study,
                contactEmail: contactEmail,
                phoneNumber: phoneNumber,
                datePost: datePost,
                annualWork: annualWork
            });
            alert('Job posting submitted successfully!');
        } catch (error) {
            console.error('Error submitting job posting:', error);
            alert('Error submitting job posting. Please try again.');
        }
    });
}

const signUp = document.getElementById('submitSignUp');
if (signUp) {
    signUp.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('rEmail').value;
        const password = document.getElementById('rPassword').value;
        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;
        const userType = document.getElementById('userType').value;

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                userType: userType
            };
            // Add user data to Firestore
            setDoc(doc(db, "users", user.uid), userData)
            .then(() => {
                console.log('User data added to Firestore');
            })
            .catch((error) => {
                console.error('Error adding user data to Firestore:', error);
            });
            console.log('User registered:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorCode, errorMessage);
        });
    });
}

const signIn = document.getElementById('submitSignIn');
if (signIn) {
    signIn.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
    });
}