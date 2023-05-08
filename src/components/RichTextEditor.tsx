interface RichTextEditorProps {
  callback?: (value: any) => void;
}

const RichTextEditor = ({ callback }: RichTextEditorProps) => {
  return (
    <div>
      <label className="text-pink-600 text-lg font-bold font-sans">
        Details
      </label>
    </div>
  );
};

export default RichTextEditor;
