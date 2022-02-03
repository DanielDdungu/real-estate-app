import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

function OAuth() {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            //Check if user is already exists
            const docRef = doc(db, "users", user.uid);
            const doSnap = await getDoc(docRef);

            // Check if the user does not already exist in the database, crate user
            if (!doSnap.exist()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (error) {
            toast.error("Could not authorize with google");
        }
    };

    return (
        <div className="socialLogin">
            <p className="">
                Sign {location.pathname === "signup" ? "up" : "in"} with
            </p>
            <button className="socialIconDiv " onClick={onGoogleClick}>
                <img className="socialIconImg" src={googleIcon} alt="google" />
            </button>
        </div>
    );
}

export default OAuth;
