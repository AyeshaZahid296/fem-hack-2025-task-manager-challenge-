import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import googleImage from "../assets/Google_Icons.webp"; // Import the image here

const SignInWithGoogle = () => {
    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: user.displayName,
                    photo: user.photoURL,
                    lastName: "",
                });
                toast.success("User logged in Successfully", { position: "top-center" });
                window.location.href = "/profile"; // Redirect to profile page
            }
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        }
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <p className="text-sm text-gray-600 mb-2">Or continue with</p>
            <div
                onClick={googleLogin}
                className="cursor-pointer bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out flex items-center justify-center space-x-3"
            >
                <img src={googleImage} alt="Google" className="w-8 h-8" />
                <span className="text-gray-700 font-medium">Google</span>
            </div>
        </div>
    );
};

export default SignInWithGoogle;
