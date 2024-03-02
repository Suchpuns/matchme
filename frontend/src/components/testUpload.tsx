import { ChangeEvent, useEffect, useState } from "react";

const TestUpload = () => {
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            console.log(e.target?.result)
        }
        reader.readAsText(file,'utf-8')

    }

    return (
        <>
            <input type="file" onChange={handleFileChange} /><h2>Text</h2>
            <div>{file && `${file.name} - ${file.type}`}</div>

            <button onClick={handleUploadClick}>Load</button>
        </>
    );
  }
  
  export default TestUpload;