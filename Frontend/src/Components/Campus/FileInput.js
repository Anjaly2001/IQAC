import React, { useState } from 'react';

const FileInput = ({ id, label, onChange, fileName, preview }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onChange(e);
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
        <span style={{ color: 'red' }}>*</span>
      </label>
      <div className="d-flex align-items-center">
        <input
          type="file"
          id={id}
          className="form-control same-width"
          onChange={handleFileChange}
        />
        <label htmlFor={id} className="ms-2">
          {fileName}
        </label>
      </div>
      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '20%', height: '30%' }}
          />
        </div>
      )}
    </div>
  );
};

export default FileInput;
