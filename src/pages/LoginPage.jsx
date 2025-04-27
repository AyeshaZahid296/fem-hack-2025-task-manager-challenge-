import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import SignInWithGoogle from "../components/SignInWithGoogle";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully");
            toast.success("User logged in Successfully!", { position: "top-center" });
            navigate("/home"); // Redirect to homepage after login
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>
                <form onSubmit={handleSubmit}>
                    {/* FORM FIELDS */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out">
                            Login
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() => navigate("/register")} // Navigate to register page
                        >
                            Register
                        </span>
                    </p>
                </div>

                <SignInWithGoogle />
            </div>
        </div>
    );
};

export default LoginPage;
