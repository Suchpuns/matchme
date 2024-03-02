import { useEffect, useState } from "react";
import Parser from "@json2csv/plainjs/Parser.js";

const TestDownload = () => {
    const [responseData, setResponseData] = useState(null)

    useEffect(() => {
        fetch("http://127.0.0.1:5000/test")
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            setResponseData(data)
        })
        .catch((e) => console.log(e))   
    }, [])

    function downloadAsCSV() {
        console.log("clicked")
        if (responseData !== null) {
            try {
                const opts = { };
                const parser = new Parser(opts);
                const csv = parser.parse(responseData);

                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
                const url = URL.createObjectURL(blob)
                  
                let pom = document.createElement('a');
                pom.href = url;
                pom.setAttribute('download', 'matchme.csv');
                pom.click();
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <>
            <h2>Text</h2>
            <div className="bg-slate-800 rounded-sm" onClick={(e) => downloadAsCSV()}>What the fuck</div>
        </>
    );
  }
  
  export default TestDownload;