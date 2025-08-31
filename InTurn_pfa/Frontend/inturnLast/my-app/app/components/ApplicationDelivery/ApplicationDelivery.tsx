"use client";
import React, { useEffect, useState } from "react";
import "./ApplicationDelivery.css";

interface ApplicationDeliveryFormProps {
  onChange: (data: {
    deliveryMethod: "email" | "external";
    contactInfo: string;
  }) => void;
}

const ApplicationDeliveryForm: React.FC<ApplicationDeliveryFormProps> = ({ onChange }) => {
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "external">("email");
  const [contactInfo, setContactInfo] = useState("");

  useEffect(() => {
    onChange({ deliveryMethod, contactInfo });
  }, [deliveryMethod, contactInfo]);

  return (
    <div className="application-delivery-form">
      <h2>Receive Application</h2>
      <div className="form-group">
        <label>How would you like to receive your applications?</label>
        <div className="radio-and-input-container">
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="deliveryMethod"
                value="email"
                checked={deliveryMethod === "email"}
                onChange={() => setDeliveryMethod("email")}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                name="deliveryMethod"
                value="external"
                checked={deliveryMethod === "external"}
                onChange={() => setDeliveryMethod("external")}
              />
              External Link
            </label>
          </div>

          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder={
              deliveryMethod === "email"
                ? "example@example.com"
                : "https://www.example.com"
            }
            required
          />
        </div>
      </div>
      <div className="disclaimer">
        <span className="exclamation-icon">!</span>
        <h6>This is how you are going to receive applications</h6>
      </div>
    </div>
  );
};

export default ApplicationDeliveryForm;
