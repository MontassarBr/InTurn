"use client";
import React, { useState } from 'react';
import './ApplicationDeliveryForm.css'; // Reuse the same CSS file

// Define the props for the component
interface ApplicationDeliveryFormProps {
  onSubmit: (data: {
    deliveryMethod: 'email' | 'external';
    contactInfo: string;
  }) => void;
}

const ApplicationDeliveryForm: React.FC<ApplicationDeliveryFormProps> = ({ onSubmit }) => {
  // State to manage form inputs
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'external'>('email');
  const [contactInfo, setContactInfo] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Check for empty fields
    const newErrors: { [key: string]: boolean } = {};
    if (!contactInfo) newErrors.contactInfo = true;

    // If there are errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call the onSubmit prop with the form data
    onSubmit({
      deliveryMethod,
      contactInfo,
    });
  };

  return (
    <div className="application-delivery-form">
      <h2>Receive Application</h2>
      <form onSubmit={handleSubmit}>
        {/* Delivery Method */}
        <div className="form-group">
          <label>How would you like to receive your applications?</label>
          <div className="radio-and-input-container">
            {/* Radio Buttons (Horizontal) */}
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="email"
                  checked={deliveryMethod === 'email'}
                  onChange={() => setDeliveryMethod('email')}
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="external"
                  checked={deliveryMethod === 'external'}
                  onChange={() => setDeliveryMethod('external')}
                />
                External Link
              </label>
            </div>

            {/* Input Field on the Right */}
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder={
                deliveryMethod === 'email' ? 'example@example.com' : 'https://www.example.com'
              }
              className={errors.contactInfo ? 'error' : ''}
              required
            />
          </div>
          {errors.contactInfo && (
            <span className="error-message">This field is required.</span>
          )}
        </div>
        <div className="disclaimer">
          <span className="exclamation-icon">!</span>
          <h6>This is how you are going to receive applications</h6>
        </div>
      </form>
    </div>
  );
};

export default ApplicationDeliveryForm;
