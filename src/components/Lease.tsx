import { Button, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import { API } from "../services/configAPI";
import apiClient from "../services/apiClient";
import { getUserId } from "../services/userService";
import axios from "axios";

const month = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

export default function Lease({ data }: { data: string }) {

  const [pdfFiles, setPdfFiles] = useState();
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    
    const file = event.target.files[0];
    if(file.type.startsWith('application/pdf'))
    {
      setPdfFiles(file);
      const blob = new Blob([file], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }
    else
    {
      alert("PDF File only")
      setPdfFiles(undefined);
    }
  };

  const sendContractData = async () =>
  {
    const formData = new FormData();
    formData.append(`file`, pdfFiles);
    try { 
      const res = await apiClient(
        `${API}/Contract/uploadFilePDF/${data}`,
        {
          method: "POST",
          data: formData,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async () =>
  {
    try { 
      const res = await apiClient(
        `${API}/Contract/getFilePDF/${data}`,
        {
          responseType: 'blob',
          method: "GET",
        }
      );
      //console.log(res);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      setPdfUrl(undefined);
      setPdfFiles(undefined);
      console.log(error);
    }
  }

  useEffect(() => {
  
    getData();
    
  }, [data]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-20">
          <Select label="Select Month">
            {month.map((m) => (
              <Option>{m}</Option>
            ))}
          </Select>
        </div>
        <input
          type="file"
          className="sr-only"
          id="inputImg"
          onChange={handleFileChange} // ใส่โค้ดการจัดการเมื่อมีการเลือกไฟล์ที่เปลี่ยนแปลงที่นี่
          
        />
        <label
          htmlFor="inputImg"
          className="cursor-pointer py-1 px-3 rounded-md font-semibold text-sm bg-[#FFBF73] hover:bg-[#F18C48] text-b flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          {pdfFiles ? <span>File Ready</span> : <span>Upload</span>}
        </label>
        
      </div>
      <div className="flex w-full border rounded mt-5 p-5 h-[60vh] lg:h-96 items-center justify-center">
        <iframe src={pdfUrl} width="100%" height="410" />
      </div>
      <div className="flex justify-end mt-5">
        <Button onClick={sendContractData} className="bg-prim hover:bg-prim2 text-a">Save</Button>
      </div>
    </div>
  );
}
