import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  callback?: (value: any) => void;
}

const RichTextEditor = ({ callback }: RichTextEditorProps) => {
  const [value, setValue] = useState('');

  // const handleTextChange=() =>{
  //   onChange(value)
  // }
  // const handleCallback = () => callback(value);

  // useEffect(() => {
  //   if (value) {
  //     handleCallback();
  //   }
  // }, [value]);

  console.log('rich', typeof value);
  return (
    <div>
      <label className="text-pink-600 text-lg font-bold font-sans">
        Details
      </label>
      {/* <ReactQuill
        className="h-44 mb-14"
        theme="snow"
        value={value}
        onChange={(e) => {
          setValue();
          handleCallback();
        }}
      /> */}
    </div>
  );
};

export default RichTextEditor;
