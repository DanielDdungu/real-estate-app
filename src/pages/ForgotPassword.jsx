import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const onChange = (e) => {
        setEmail(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success("Email was sent successfully");
        } catch (error) {
            toast.error("Email was rejected");
        }
    };

    return (
        <div className="pageConatiner">
            <header>
                <p className="pageHeader">Forgot Password</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="Enter your email"
                        id="email"
                        value={email}
                        onChange={onChange}
                    />
                    <Link to="/signin" className="forgotPasswordlink"></Link>
                    <div className="signInBar">
                        <div className="signInText">Send Reset Link</div>
                        <button className="signInButton">
                            <ArrowRightIcon
                                fill="#ffff"
                                width="34"
                                height="34"
                            />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default ForgotPassword;
