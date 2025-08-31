"use client";
import React, { useState, useEffect } from "react";
import "./InternshipInfoForm.css";

enum WorkArrangement {
  Remote = "Remote",
  Onsite = "Onsite",
  Hybrid = "Hybrid",
}

enum WorkTime {
  FullTime = "Full Time",
  PartTime = "Part Time",
}

enum Payment {
  Paid = "Paid",
  Unpaid = "Unpaid",
}

interface InternshipData {
  title: string;
  workArrangement: WorkArrangement | undefined;
  workTime: WorkTime | undefined;
  location: string;
  minSalary: number;
  maxSalary: number;
  description: string;
  startDate: string;
  endDate: string;
  payment: Payment | undefined;
  responsibilities: string[];
}

interface InternshipInfoFormProps {
  onChange: (data: InternshipData) => void;
  initialData?: InternshipData;
}

const InternshipInfoForm: React.FC<InternshipInfoFormProps> = ({
  onChange,
  initialData,
}) => {
  const [formData, setFormData] = useState<InternshipData>({
    title: initialData?.title || "",
    workArrangement: initialData?.workArrangement,
    workTime: initialData?.workTime,
    location: initialData?.location || "",
    minSalary: initialData?.minSalary || 0,
    maxSalary: initialData?.maxSalary || 0,
    description: initialData?.description || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    payment: initialData?.payment,
    responsibilities: initialData?.responsibilities || [],
  });

  const [newResponsibility, setNewResponsibility] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        workArrangement: initialData.workArrangement,
        workTime: initialData.workTime,
        location: initialData.location || "",
        minSalary: initialData.minSalary || 0,
        maxSalary: initialData.maxSalary || 0,
        description: initialData.description || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        payment: initialData.payment,
        responsibilities: initialData.responsibilities || [],
      });
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    if (id === "payment") {
      const updatedFormData = {
        ...formData,
        [id]: value as Payment,
        ...(value === Payment.Unpaid && { minSalary: 0, maxSalary: 0 })
      };

      setFormData(updatedFormData);
      setErrors(newErrors);
      onChange(updatedFormData);
      return;
    }

    const updatedFormData = {
      ...formData,
      [id]: id === "minSalary" || id === "maxSalary" 
        ? value === "" ? 0 : Number(value)
        : value
    };

    // Validate
    switch (id) {
      case "title":
        !value ? (newErrors.title = "Title is required") : delete newErrors.title;
        break;
      case "workArrangement":
        !value ? (newErrors.workArrangement = "Work arrangement is required") : delete newErrors.workArrangement;
        break;
      case "workTime":
        !value ? (newErrors.workTime = "Work time is required") : delete newErrors.workTime;
        break;
      case "payment":
        !value ? (newErrors.payment = "Payment type is required") : delete newErrors.payment;
        break;
      case "location":
        !value ? (newErrors.location = "Location is required") : delete newErrors.location;
        break;
      case "minSalary":
        if (formData.payment === Payment.Paid) {
          const min = value === "" ? 0 : Number(value);
          if (value !== "" && isNaN(min)) {
            newErrors.minSalary = "Must be a valid number";
          } else if (min < 0) {
            newErrors.minSalary = "Cannot be negative";
          } else if (updatedFormData.maxSalary > 0 && min > updatedFormData.maxSalary) {
            newErrors.minSalary = "Cannot exceed Max Salary";
          } else {
            delete newErrors.minSalary;
          }
        }
        break;
      case "maxSalary":
        if (formData.payment === Payment.Paid) {
          const max = value === "" ? 0 : Number(value);
          if (value !== "" && isNaN(max)) {
            newErrors.maxSalary = "Must be a valid number";
          } else if (max < 0) {
            newErrors.maxSalary = "Cannot be negative";
          } else if (updatedFormData.minSalary > 0 && max < updatedFormData.minSalary) {
            newErrors.maxSalary = "Cannot be less than Min Salary";
          } else {
            delete newErrors.maxSalary;
          }
        }
        break;
      case "description":
        !value ? (newErrors.description = "Description is required") : delete newErrors.description;
        break;
      case "startDate":
        if (!value) newErrors.startDate = "Start date is required";
        else if (updatedFormData.endDate && new Date(value) > new Date(updatedFormData.endDate))
          newErrors.startDate = "Start date cannot be after end date";
        else delete newErrors.startDate;
        break;
      case "endDate":
        if (!value) newErrors.endDate = "End date is required";
        else if (updatedFormData.startDate && new Date(value) < new Date(updatedFormData.startDate))
          newErrors.endDate = "End date cannot be before start date";
        else delete newErrors.endDate;
        break;
    }

    // Validate responsibilities
    if (updatedFormData.responsibilities.length === 0) {
      newErrors.responsibilities = "At least one responsibility is required";
    } else {
      delete newErrors.responsibilities;
    }

    setFormData(updatedFormData);
    setErrors(newErrors);
    onChange(updatedFormData);
  };

  const handleAddResponsibility = () => {
    if (newResponsibility.trim()) {
      const updatedResponsibilities = [...formData.responsibilities, newResponsibility.trim()];
      const updatedFormData = {
        ...formData,
        responsibilities: updatedResponsibilities
      };
      
      setFormData(updatedFormData);
      setNewResponsibility("");
      onChange(updatedFormData);
      
      // Clear responsibility error if adding first one
      if (updatedResponsibilities.length === 1) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.responsibilities;
          return newErrors;
        });
      }
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    const updatedResponsibilities = formData.responsibilities.filter((_, i) => i !== index);
    const updatedFormData = {
      ...formData,
      responsibilities: updatedResponsibilities
    };
    
    setFormData(updatedFormData);
    onChange(updatedFormData);
    
    // Add error if no responsibilities left
    if (updatedResponsibilities.length === 0) {
      setErrors(prev => ({
        ...prev,
        responsibilities: "At least one responsibility is required"
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddResponsibility();
    }
  };

  return (
    <div className="internship-info-form">
      <h2>Internship Information</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
          className={errors.title ? "error" : ""}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="workArrangement">Work Arrangement</label>
        <select
          id="workArrangement"
          value={formData.workArrangement || ""}
          onChange={handleInputChange}
          className={errors.workArrangement ? "error" : ""}
        >
          <option value="">Select</option>
          {Object.values(WorkArrangement).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.workArrangement && (
          <span className="error-message">{errors.workArrangement}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="workTime">Work Time</label>
        <select
          id="workTime"
          value={formData.workTime || ""}
          onChange={handleInputChange}
          className={errors.workTime ? "error" : ""}
        >
          <option value="">Select</option>
          {Object.values(WorkTime).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.workTime && (
          <span className="error-message">{errors.workTime}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="payment">Payment Type</label>
        <select
          id="payment"
          value={formData.payment || ""}
          onChange={handleInputChange}
          className={errors.payment ? "error" : ""}
        >
          <option value="">Select</option>
          {Object.values(Payment).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.payment && (
          <span className="error-message">{errors.payment}</span>
        )}
      </div>

      {formData.payment === Payment.Paid && (
        <>
          <div className="form-group">
            <label htmlFor="minSalary">Min Salary (DT)</label>
            <input
              type="number"
              id="minSalary"
              value={formData.minSalary === 0 ? "" : formData.minSalary}
              onChange={handleInputChange}
              className={errors.minSalary ? "error" : ""}
              min="0"
            />
            {errors.minSalary && (
              <span className="error-message">{errors.minSalary}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="maxSalary">Max Salary (DT)</label>
            <input
              type="number"
              id="maxSalary"
              value={formData.maxSalary === 0 ? "" : formData.maxSalary}
              onChange={handleInputChange}
              className={errors.maxSalary ? "error" : ""}
              min="0"
            />
            {errors.maxSalary && (
              <span className="error-message">{errors.maxSalary}</span>
            )}
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={handleInputChange}
          className={errors.location ? "error" : ""}
        />
        {errors.location && (
          <span className="error-message">{errors.location}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className={errors.startDate ? "error" : ""}
        />
        {errors.startDate && (
          <span className="error-message">{errors.startDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          className={errors.endDate ? "error" : ""}
        />
        {errors.endDate && (
          <span className="error-message">{errors.endDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          className={errors.description ? "error" : ""}
          rows={5}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label>Responsibilities</label>
        <div className="responsibilities-container">
          {formData.responsibilities.map((responsibility, index) => (
            <div key={index} className="responsibility-item">
              <span>{responsibility}</span>
              <button 
                type="button" 
                className="remove-responsibility"
                onClick={() => handleRemoveResponsibility(index)}
                aria-label="Remove responsibility"
              >
                ×
              </button>
            </div>
          ))}
          <div className="add-responsibility">
            <input
              type="text"
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a responsibility"
              className={errors.responsibilities ? "error" : ""}
            />
            <button 
              type="button" 
              className="add-button"
              onClick={handleAddResponsibility}
            >
              Add
            </button>
          </div>
        </div>
        {errors.responsibilities && (
          <span className="error-message">{errors.responsibilities}</span>
        )}
      </div>

      <div className="disclaimer">
        <span className="exclamation-icon">!</span>
        <h6>This is how candidates will figure out the internship details</h6>
      </div>
    </div>
  );
};

export default InternshipInfoForm;