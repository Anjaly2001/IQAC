import React from 'react';

const FormField = ({ id, label, value, onChange, error, placeholder }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
      <span style={{ color: 'red' }}>*</span>
    </label>
    <input
      type="text"
      id={id}
      className="form-control same-width"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <small className="text-danger">{error}</small>}
  </div>
);

export default FormField;
