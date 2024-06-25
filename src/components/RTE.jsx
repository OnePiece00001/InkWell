import React, { useCallback, useMemo, useRef, useState } from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RTE({name, control, label, defaultValue =""}) {
  const [value, setValue] = useState("");

  // Editor ref
  const quill = useRef();

  // Handler to handle button clicked
  function handler() {
    console.log(value);
  }
  
  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          // ["link", "image"],
          ["clean"],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    // "image",
    "color",
    "clean",
  ];



  return (
    <div className="w-full h-screen"> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <QuillEditor
        initialValue={defaultValue}
        className="h-2/3"
        ref={(el) => (quill.current = el)}
        theme="snow"
        formats={formats}
        modules={modules}
        onChange={onChange}
      />
    )}
    />

     </div>
  )
}

