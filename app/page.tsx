"use client";

import { useState } from "react";
import axios from "axios";

import Page1 from "./components/multi-form/Page1";
import Page2 from "./components/multi-form/Page2";
import Page3 from "./components/multi-form/Page3";
import SummaryPage from "./components/multi-form/SummaryPage";

import { FormDataType } from "./utils/types";

export default function HomePage() {
  const [step, setStep] = useState(1);
  const [isSummary, setIsSummary] = useState(false);
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);

  const [formData, setFormData] = useState<FormDataType>({
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    age: 0,
    address: "",
    education: "",
    experience: "",
    position: "",
    resumeUrl: null,
  });

  const handleNextStep = () => {
    const currentErrors: { field: string; message: string }[] = [];

    if (step === 1) {
      if (!formData.prefix || !["Mr", "Ms", "Mrs", "Other"].includes(formData.prefix)) {
        currentErrors.push({ field: "prefix", message: "Prefix is required and must be valid." });
      }
      if (!formData.firstName || !/^[a-zA-Z]+$/.test(formData.firstName)) {
        currentErrors.push({
          field: "firstName",
          message: "First Name must only contain alphabetic characters.",
        });
      }
      if (!formData.lastName || !/^[a-zA-Z]+$/.test(formData.lastName)) {
        currentErrors.push({
          field: "lastName",
          message: "Last Name must only contain alphabetic characters.",
        });
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        currentErrors.push({ field: "email", message: "Valid Email is required." });
      }
      if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
        currentErrors.push({
          field: "phoneNumber",
          message: "Phone Number must be exactly 10 digits.",
        });
      }
    }

    if (step === 2) {
      if (!formData.gender || !["male", "female", "other"].includes(formData.gender)) {
        currentErrors.push({ field: "gender", message: "Gender is required and must be valid." });
      }
      if (!formData.age || formData.age <= 0) {
        currentErrors.push({
          field: "age",
          message: "Age must be greater than 0.",
        });
      }
      if (!formData.address || formData.address.trim() === "") {
        currentErrors.push({ field: "address", message: "Address is required." });
      }
    }
    if (step === 3) {
      if (!formData.education || !["HighSchool", "Diploma", "Bachelor", "Master", "Doctorate", "Other"].includes(formData.education)) {
        currentErrors.push({ field: "education", message: "Education is required and must be valid." });
      }
      if (!formData.experience || formData.experience.trim() === "") {
        currentErrors.push({
          field: "experience",
          message: "Work Experience is required.",
        });
      }
      if (!formData.position || formData.position.trim() === "") {
        currentErrors.push({
          field: "position",
          message: "Position is required.",
        });
      }
    }


    setErrors(currentErrors);

    if (currentErrors.length === 0) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };


  const handlePreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (newData: Partial<FormDataType>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const backToEdit = () => {
    setIsSummary(false);
  };

  const submitFormData = async () => {
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key as keyof FormDataType] as any);
      });

      const response = await axios.post("/api/form", form);
      alert(response.data.message || "Form submitted successfully!");
      resetForm(); // Reset the form
    } catch (error: any) {
      if (error.response?.data?.error) {
        setErrors(error.response.data.error); // Save API errors
      } else {
        alert("Something went wrong while submitting the form.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      age: 0,
      address: "",
      education: "",
      experience: "",
      position: "",
      resumeUrl: null,
    });
    setErrors([]); // Clear errors
    setStep(1);
    setIsSummary(false);
  };

  const getErrorMessage = (field: string) =>
    errors.find((error) => error.field === field)?.message;

  const renderStep = () => {
    if (step === 4) {
      return <SummaryPage formData={formData} />;
    }
    switch (step) {
      case 1:
        return <Page1 formData={formData} updateFormData={updateFormData} getErrorMessage={getErrorMessage} />;
      case 2:
        return <Page2 formData={formData} updateFormData={updateFormData} getErrorMessage={getErrorMessage} />;
      case 3:
        return <Page3 formData={formData} updateFormData={updateFormData} getErrorMessage={getErrorMessage} />;
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-black">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isSummary ? "Summary Form" : "Multistep Form"}
        </h1>
        {renderStep()}
        {!isSummary && (
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                onClick={handlePreviousStep}
                className="px-4 py-2 rounded text-white bg-blue-500"
              >
                Previous
              </button>
            )}
            {step === 4 ? (
              <button
                onClick={() => setIsSummary(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
