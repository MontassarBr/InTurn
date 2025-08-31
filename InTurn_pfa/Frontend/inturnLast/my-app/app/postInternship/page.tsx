"use client";
import React, { useState } from "react";
import InternshipInfoForm from "../components/InternshipInfoForm/InternshipInfoForm";
import ApplicationDeliveryForm from "../components/ApplicationDelivery/ApplicationDelivery";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./postpage.css";

interface InternshipData {
  title: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  description: string;
  startDate: string;
  endDate: string;
  workArrangement: "Onsite" | "Remote" | "Hybrid";
  workTime: "Full Time" | "Part Time";
  payment: "Unpaid" | "Paid";
  responsibilities: string[];
}

interface ApplicationDeliveryData {
  deliveryMethod: "email" | "external";
  contactInfo: string;
}

const getAuthToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];
};

const ParentPage: React.FC = () => {
  const [internshipData, setInternshipData] = useState<InternshipData>({
    title: "",
    location: "",
    minSalary: 0,
    maxSalary: 0,
    description: "",
    startDate: "",
    endDate: "",
    workArrangement: "Onsite",
    workTime: "Full Time",
    payment: "Unpaid",
    responsibilities: [],
  });

  const [applicationDeliveryData, setApplicationDeliveryData] =
    useState<ApplicationDeliveryData>({
      deliveryMethod: "email",
      contactInfo: "",
    });

  const [formStatus, setFormStatus] = useState({
    internshipInfo: false,
    applicationDelivery: true,
  });

  const handleInternshipChange = (data: Partial<InternshipData>) => {
    const updatedData = { ...internshipData, ...data };
    setInternshipData(updatedData);

    // Validate all required fields including responsibilities
    const isComplete =
      updatedData.title &&
      updatedData.location &&
      updatedData.startDate &&
      updatedData.endDate &&
      updatedData.description &&
      updatedData.workArrangement &&
      updatedData.workTime &&
      updatedData.payment &&
      updatedData.responsibilities.length > 0 && // At least one responsibility required
      (updatedData.payment === "Unpaid" || 
       (updatedData.minSalary > 0 && updatedData.maxSalary > 0));

    setFormStatus((prev) => ({
      ...prev,
      internshipInfo: !!isComplete,
    }));
  };

  const handleApplicationDeliveryChange = (data: ApplicationDeliveryData) => {
    setApplicationDeliveryData(data);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = getAuthToken();

      // Prepare data to send
      const dataToSend = {
        ...internshipData,
        ...(internshipData.payment === "Unpaid" && { 
          minSalary: 0,
          maxSalary: 0 
        })
      };

      const response = await fetch("http://localhost:3001/api/companies/internship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Internship posting submitted successfully!");
        handleCancel();
      } else {
        const errorData = await response.json();
        alert(`Failed to submit: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting. Please try again.");
    }
  };

  const handleCancel = () => {
    setInternshipData({
      title: "",
      location: "",
      minSalary: 0,
      maxSalary: 0,
      description: "",
      startDate: "",
      endDate: "",
      workArrangement: "Onsite",
      workTime: "Full Time",
      payment: "Paid",
      responsibilities: [],
    });

    setApplicationDeliveryData({
      deliveryMethod: "email",
      contactInfo: "",
    });

    setFormStatus({
      internshipInfo: false,
      applicationDelivery: true,
    });
  };

  return (
    <>
      <Navbar />
      <div className="internship-posting-page">
        <div className="form-menu">
          <div className="menu-item">
            Internship Info
            {formStatus.internshipInfo && <span className="checkmark">✓</span>}
          </div>
          <div className="menu-item">Receive Application</div>
        </div>

        <div className="page-container">
          <h1>Post a new Internship</h1>
          <form onSubmit={handleSubmit}>
            <InternshipInfoForm
              onChange={handleInternshipChange}
              initialData={internshipData}
            />
            <ApplicationDeliveryForm
              onChange={handleApplicationDeliveryChange}
            />
            <div className="button-group">
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="post-button"
                disabled={!formStatus.internshipInfo}
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ParentPage;