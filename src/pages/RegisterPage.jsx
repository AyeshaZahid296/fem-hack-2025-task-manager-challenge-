import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // 👈 ADD THIS

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const navigate = useNavigate(); // 👈 ADD THIS

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    photo: "",
                });
            }
            toast.success("User Registered Successfully", { position: "top-center" });
            navigate("/login"); // 👈 CORRECT WAY
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-center mb-6">Register</h3>
                <form onSubmit={handleRegister}>
                    {/* FORM FIELDS */}
                    {/* SAME AS YOURS */}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
