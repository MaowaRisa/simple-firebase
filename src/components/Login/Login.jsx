import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";
// import { GoogleAuthProvider } from "firebase/auth/cordova";


const Login = () => {
    const [user, setUser] =  useState(null);
    const auth = getAuth(app);
    // console.log(app)
    const provider = new GoogleAuthProvider()
    const handleGoogleSinIn = () =>{
        // console.log('google mama is coming')
        signInWithPopup(auth, provider)
        .then(result =>{
            // console.log(result);
            const loggedInUser = result.user;
            console.log(loggedInUser)
            setUser(loggedInUser);
        })
        .catch(error =>{
            console.log(error.message)
        })
    }
    const handleSignOut = () =>{
        signOut(auth)
        .then( result =>{
            console.log(result)
            setUser(null)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            <button onClick={handleGoogleSinIn}>Google login</button>
            {
                user && <div>
                    <h3>User: {user.displayName}</h3>
                    <p>Email: {user.email}</p>
                    <img src={user.photoURL} alt="" />
                    <button onClick={handleSignOut}>SignOut</button>
                </div>
            }
        </div>
    );
};

export default Login;