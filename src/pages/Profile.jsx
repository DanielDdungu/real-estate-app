import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Profiles() {
    const auth = getAuth();
    const [changeDetails, setChangeDetails] = useState(false);

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;
    const navigate = useNavigate();

    //ON LOGOUT FUNCTION
    const onLogout = () => {
        auth.signOut();
        navigate("/");
    };

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                //UPDATE DISPLAY NAMES

                await updateProfile(auth.currentUser, { displayName: name });

                //UPDATE IN FIRESTORE DIS
                const userRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(userRef, { name });
            }
        } catch (error) {
            toast.error("Could not update profile deatils");
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button className="logOut" onClick={onLogout}>
                    Logout
                </button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p
                        className="changePersonalDetails"
                        onClick={() => {
                            changeDetails && onSubmit();
                            setChangeDetails((prevState) => !prevState);
                        }}
                    >
                        {changeDetails ? "done" : "change"}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            className={
                                !changeDetails
                                    ? "profileName"
                                    : "profileNameActive"
                            }
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                            id="name"
                        />
                        <input
                            type="text"
                            className={
                                !changeDetails
                                    ? "profileEmail"
                                    : "profileEmailActive"
                            }
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                            id="email"
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Profiles;
