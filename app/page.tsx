"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosSave } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
import Swal from 'sweetalert2'

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
      if (!formData.firstName || !/^[a-zA-Zก-๙\s]+$/.test(formData.firstName)) {
        currentErrors.push({
          field: "firstName",
          message: "First Name only contain characters (English or Thai), and no special symbols.",
        });
      }
      if (!formData.lastName || !/^[a-zA-Zก-๙\s]+$/.test(formData.lastName)) {
        currentErrors.push({
          field: "lastName",
          message: "Last Name must only contain characters (English or Thai), and no special symbols"
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
      if (!formData.gender || !["Male", "Female", "Other"].includes(formData.gender)) {
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

    if (step === 4) {
      setIsSummary(true);
    }

    setErrors(currentErrors);

    if (currentErrors.length === 0) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);


  const saveFormData = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    toast.success("Saved successfully!");

  };

  const handlePreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (newData: Partial<FormDataType>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };
  const submitFormData = async () => {
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof FormDataType];
        if (value instanceof File) {
          form.append(key, value);
        } else {
          form.append(key, String(value));
        }
      });

      const response = await axios.post("/api/form", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message);
      resetForm(true)
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form!");
    }
  };


  const resetForm = (isReset = true) => {
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
    setErrors([]);
    setStep(1);
    setIsSummary(false);
    localStorage.removeItem("formData");
    if (!isReset) {
      toast.info("Form has been reset!");
    }
  };

  const handleResetForm = () => {
    try {
      Swal.fire({
        title: "Are you sure you want to reset the form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reset form!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Reset successful!",
            icon: "success"
          });
        }
      });

    } catch (error) {

    }
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
        return <Page3 formData={formData} updateFormData={updateFormData} getErrorMessage={getErrorMessage} />

      default:
        return null;
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-black">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <div className="flex justify-center relative">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {step < 4 ? "Multistep Form" : "Review Form"}
          </h1>

          <div>
            <button onClick={handleResetForm} title="Reset form"
              className="bg-red-500 text-white p-2 rounded absolute right-10 hover:scale-105 duration-300">
              <RiResetLeftFill size={18} />
            </button>
            <button onClick={saveFormData} title="Save form"
              className="bg-green-500 text-white p-2 rounded absolute right-0 hover:scale-105 duration-300">
              <IoIosSave size={18} />
            </button>
          </div>

        </div>

        {renderStep()}
        {!isSummary && (
          <div className="flex justify-between mt-4">
            {step && (
              <button
                onClick={handlePreviousStep}
                disabled={step === 1} // ปิดการใช้งานเมื่อเป็นหน้าแรก
                className={`px-4 py-2 rounded text-white ${step === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:scale-105 duration-300"}`}
              >
                Previous
              </button>

            )}
            {step === 4 ? (
              <button
                onClick={submitFormData}
                className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 duration-300"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 duration-300"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div >
  );
}

