"use client";
import React, { useState } from "react";
import { z } from "zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useRouter } from "next/navigation";

const JoinUs: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "",
    gender: null, // Initial value set to null
    subscribe: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const router = useRouter(); // Instantiate the useRouter hook for navigation

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    dateOfBirth: z.string().nonempty("Date of Birth is required"),
    country: z.string().nonempty("Country is required"),
    gender: z.union([z.enum(["male", "female"]), z.null()]).refine((val) => val !== null, {
      message: "Gender is required",
    }),
    subscribe: z.boolean().optional(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked ?? false;
  
    // Update formData with the new value
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
  
    setFormData(updatedFormData);
  
    // Validate all fields in the form
    try {
      schema.parse(updatedFormData); // Validate the entire form
      setFormErrors({}); // Clear errors if all fields are valid
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          errors[err.path[0] as string] = err.message; // Collect errors for all invalid fields
        });
        setFormErrors(errors);
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonLoading(true);

    try {
      schema.parse(formData);
      localStorage.setItem("nikeMemberData", JSON.stringify(formData));
      toast.success("You have successfully signed up!"); // Show toast on success

      // Redirect to login page after the toast
      setTimeout(() => {
        router.push("/login"); // Redirect after a short delay
      }, 2000); // Delay to allow the toast to be seen before redirect

      setFormErrors({});
      setButtonLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          errors[err.path[0] as string] = err.message;
        });
        setFormErrors(errors);
      }
      setButtonLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-full my-10 bg-white">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-center text-lg font-bold mb-6">BECOME A NIKE MEMBER</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              name="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <span className="text-red-500 text-sm">{formErrors.email}</span>}
          </div>
          <div className="relative">
            <input
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-3 text-sm pr-10"
              type={passwordVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 items-center top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
            {formErrors.password && (
              <span className="text-red-500 text-sm">{formErrors.password}</span>
            )}
          </div>
          <div>
            <input
              name="firstName"
              placeholder="First Name"
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
            {formErrors.firstName && <span className="text-red-500 text-sm">{formErrors.firstName}</span>}
          </div>
          <div>
            <input
              name="lastName"
              placeholder="Last Name"
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
            {formErrors.lastName && <span className="text-red-500 text-sm">{formErrors.lastName}</span>}
          </div>
          <div>
            <input
              name="dateOfBirth"
              placeholder="Date of Birth"
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {formErrors.dateOfBirth && <span className="text-red-500 text-sm">{formErrors.dateOfBirth}</span>}
          </div>
          <div>
            <select
              name="country"
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Your Country
              </option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="Brazil">Brazil</option>
              <option value="South Africa">South Africa</option>
            </select>
            {formErrors.country && <span className="text-red-500 text-sm">{formErrors.country}</span>}
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-600">Male</label>
            <input
              className="w-4 h-4 border-gray-300 rounded focus:ring-0"
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-600">Female</label>
            <input
              className="w-4 h-4 border-gray-300 rounded focus:ring-0"
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            {formErrors.gender && <span className="text-red-500 text-sm">{formErrors.gender}</span>}
          </div>

          <div>
            <input
              name="subscribe"
              className="w-4 h-4 border-gray-300 rounded focus:ring-0"
              type="checkbox"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label className="ml-2 text-sm text-gray-600">Sign up for emails to get updates from Nike</label>
          </div>
          <button
            type="submit"
            className={`w-full bg-black text-white py-3 rounded-md font-bold text-sm tracking-wide ${
              buttonLoading ? "animate-pulse opacity-50" : ""
            }`}
            disabled={buttonLoading}
          >
            Sign Up
          </button>
        </form>
      </div>

      <ToastContainer /> {/* Display toast notifications */}
    </div>
  );
};

export default JoinUs;
