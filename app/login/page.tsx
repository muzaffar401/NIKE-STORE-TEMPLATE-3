"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = () => {
    let isValid = true;

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonLoading(true);

    if (!validateFields()) {
      setButtonLoading(false);
      return;
    }

    const storedData = localStorage.getItem("nikeMemberData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData.email === email && parsedData.password === password) {
        toast.success("Successfully signed in!");
        sessionStorage.setItem("isLogin", "true"); // Set session storage

        setTimeout(() => {
          window.location.href = "/"; // Redirect to home page
        }, 2000);
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } else {
      toast.error("No user data found. Please sign up first.");
    }

    setButtonLoading(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateFields(); // Trigger validation
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateFields(); // Trigger validation
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-sm p-6">
        <div className="flex justify-center mb-6">
          <img
            alt="Nike Logo"
            loading="lazy"
            width="100"
            height="100"
            decoding="async"
            className="h-8"
            src="/img2.png"
            style={{ color: "transparent" }}
          />
        </div>
        <h1 className="text-center text-lg font-bold mb-6">
          YOUR ACCOUNT <br /> FOR EVERYTHING <br /> NIKE
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              value={email}
              onChange={handleEmailChange}
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
              type="email"
            />
            {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
          </div>
          <div>
            <input
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
              type="password"
            />
            {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input className="w-4 h-4 border-gray-300 rounded focus:ring-0" type="checkbox" />
              <span className="ml-2">Keep me signed in</span>
            </label>
            <a href="#" className="hover:underline">
              Forgotten your password?
            </a>
          </div>
          <button
            type="submit"
            className={`w-full bg-black text-white py-3 rounded-md font-bold text-sm tracking-wide ${
              buttonLoading ? "opacity-50" : ""
            }`}
            disabled={buttonLoading}
          >
            SIGN IN
          </button>
        </form>
        <p className="text-xs text-center text-gray-600 mt-4">
          By logging in, you agree to Nike's{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Terms of Use
          </a>
          .
        </p>
        <p className="text-center text-sm mt-4">
          Not a Member?{" "}
          <a href="/signup" className="text-black underline font-semibold">
            Join Us.
          </a>
        </p>
      </div>
      <ToastContainer /> {/* Toast notification container */}
    </div>
  );
};

export default SignIn;
