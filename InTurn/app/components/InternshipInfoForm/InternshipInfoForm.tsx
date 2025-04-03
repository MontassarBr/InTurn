"use client";
import React, { useState, useEffect } from 'react';
import './InternshipInfoForm.css';

enum InternshipType {
  Remote = 'Remote',
  Onsite = 'Onsite',
  Hybrid = 'Hybrid'
}

interface InternshipData {
  title: string;
  internshipType: string | undefined;
  location: string;
  minSalary: number;
  maxSalary: number;
  description: string;
  startDate: string;
  endDate: string;
}

interface InternshipInfoFormProps {
  onChange: (data: InternshipData) => void;
  initialData?: InternshipData;
}

const InternshipInfoForm: React.FC<InternshipInfoFormProps> = ({ onChange, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [internshipType, setInternshipType] = useState<InternshipType | undefined>(
    initialData?.internshipType as InternshipType || undefined
  );
  const [location, setLocation] = useState(initialData?.location || '');
  const [minSalary, setMinSalary] = useState<number>(initialData?.minSalary || 0);
  const [maxSalary, setMaxSalary] = useState<number>(initialData?.maxSalary || 0);
  const [description, setDescription] = useState(initialData?.description || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setTitle(initialData?.title || '');
    setInternshipType(initialData?.internshipType as InternshipType || undefined);
    setLocation(initialData?.location || '');
    setMinSalary(initialData?.minSalary || 0);
    setMaxSalary(initialData?.maxSalary || 0);
    setDescription(initialData?.description || '');
    setStartDate(initialData?.startDate || '');
    setEndDate(initialData?.endDate || '');
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    let newErrors = { ...errors };
    if (id === 'title') {
      setTitle(value);
      if (!value) newErrors.title = 'Title is required';
      else delete newErrors.title;
    }
    if (id === 'internshipType') {
      const newType = value ? (value as InternshipType) : undefined;
      setInternshipType(newType);
      if (!newType) newErrors.internshipType = 'Internship type is required';
      else delete newErrors.internshipType;
    }
    if (id === 'location') {
      setLocation(value);
      if (!value) newErrors.location = 'Location is required';
      else delete newErrors.location;
    }
    if (id === 'minSalary') {
      const numValue = value === '' ? 0 : Number(value);
      setMinSalary(numValue);
      if (numValue < 0) newErrors.minSalary = 'Min Salary cannot be negative';
      else if (numValue > maxSalary && maxSalary !== 0) newErrors.minSalary = 'Min Salary cannot exceed Max Salary';
      else delete newErrors.minSalary;
    }
    if (id === 'maxSalary') {
      const numValue = value === '' ? 0 : Number(value);
      setMaxSalary(numValue);
      if (numValue < 0) newErrors.maxSalary = 'Max Salary cannot be negative';
      else if (numValue < minSalary && minSalary !== 0) newErrors.maxSalary = 'Max Salary cannot be less than Min Salary';
      else delete newErrors.maxSalary;
    }
    if (id === 'description') {
      setDescription(value);
      if (!value) newErrors.description = 'Description is required';
      else delete newErrors.description;
    }
    if (id === 'startDate') {
      setStartDate(value);
      if (!value) newErrors.startDate = 'Start date is required';
      else if (endDate && new Date(value) > new Date(endDate)) {
        newErrors.startDate = 'Start date cannot be after end date';
      } else {
        delete newErrors.startDate;
      }
    }
    if (id === 'endDate') {
      setEndDate(value);
      if (!value) newErrors.endDate = 'End date is required';
      else if (startDate && new Date(value) < new Date(startDate)) {
        newErrors.endDate = 'End date cannot be before start date';
      } else {
        delete newErrors.endDate;
      }
    }

    setErrors(newErrors);

    onChange({
      title: id === 'title' ? value : title,
      internshipType: id === 'internshipType' ? (value as InternshipType) : internshipType,
      location: id === 'location' ? value : location,
      minSalary: id === 'minSalary' ? (value === '' ? 0 : Number(value)) : minSalary,
      maxSalary: id === 'maxSalary' ? (value === '' ? 0 : Number(value)) : maxSalary,
      description: id === 'description' ? value : description,
      startDate: id === 'startDate' ? value : startDate,
      endDate: id === 'endDate' ? value : endDate,
    });
  };

  return (
    <div className="internship-info-form">
      <h2>Internship Information</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleInputChange}
          className={errors.title ? 'error' : ''}
          required
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="internshipType">Type</label>
        <select
          id="internshipType"
          value={internshipType || ''}
          onChange={handleInputChange}
          className={errors.internshipType ? 'error' : ''}
          required
        >
          {!internshipType && <option value="">Choose type</option>}
          {Object.values(InternshipType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.internshipType && <span className="error-message">{errors.internshipType}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleInputChange}
          className={errors.location ? 'error' : ''}
          required
        />
        {errors.location && <span className="error-message">{errors.location}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleInputChange}
          className={errors.startDate ? 'error' : ''}
          required
        />
        {errors.startDate && <span className="error-message">{errors.startDate}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleInputChange}
          className={errors.endDate ? 'error' : ''}
          required
        />
        {errors.endDate && <span className="error-message">{errors.endDate}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="minSalary">Min Salary (DT)</label>
        <input
          type="number"
          id="minSalary"
          value={minSalary === 0 ? '' : minSalary}
          onChange={handleInputChange}
          className={errors.minSalary ? 'error' : ''}
          required
        />
        {errors.minSalary && <span className="error-message">{errors.minSalary}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="maxSalary">Max Salary (DT)</label>
        <input
          type="number"
          id="maxSalary"
          value={maxSalary === 0 ? '' : maxSalary}
          onChange={handleInputChange}
          className={errors.maxSalary ? 'error' : ''}
          required
        />
        {errors.maxSalary && <span className="error-message">{errors.maxSalary}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={handleInputChange}
          className={errors.description ? 'error' : ''}
          required
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="disclaimer">
        <span className="exclamation-icon">!</span>
        <h6>This is how candidates will figure out the internship details</h6>
      </div>
    </div>
  );
};

export default InternshipInfoForm;
