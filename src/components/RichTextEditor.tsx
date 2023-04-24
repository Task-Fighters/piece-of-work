import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <label className="text-pink-600 text-lg font-bold font-sans">
        Details
      </label>
      <ReactQuill
        className="h-44 mb-14"
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default RichTextEditor;
