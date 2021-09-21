import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDq_0hREz43fqF-S_b5kaDdsowZclDD4KU",
    authDomain: "crwn-db-df5ec.firebaseapp.com",
    projectId: "crwn-db-df5ec",
    storageBucket: "crwn-db-df5ec.appspot.com",
    messagingSenderId: "920980075971",
    appId: "1:920980075971:web:a733c371f2c0467c6cb976",
    measurementId: "G-85HN01433S"
};


const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);


export const createUserProfileDocument = async (userAuth, additionalData)=>{
    console.log(userAuth);

    if(!userAuth)return;

    const userRef = doc(firestore, `users/${userAuth.uid}`)
    console.log(userRef);
    const snapshot = await getDoc(userRef);
    console.log(snapshot);
    console.log("User auth received: ", userAuth);
    console.log("User additionalData received: ", additionalData);

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(doc(firestore, "users", userAuth.uid),{
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (e) {
            console.log("Error when creating user", e.message);
        }
    return userRef.id;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebaseApp;


