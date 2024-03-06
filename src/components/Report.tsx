import { WifiIcon } from "@heroicons/react/24/outline";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import apiClient from "../services/apiClient";
import { API } from "../services/configAPI";

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

interface problemInterface  {
  idProblem: string;
  idRoom: string;
  idUser: string;
  category: string;
  title: string;
  details: string;
  timesTamp: string;
}
export default function Report({ data }: { data: string }) {

  const [problemData,setProblemData] = useState<problemInterface[]>();

  const getProblem = async () => 
  {
    try {
      const res = await apiClient(`${API}/Problem/GetProblemAllByIdRoom/${data}`, {
        method: 'GET',
      });
      setProblemData(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() =>{
    getProblem();
  },[data])

  return (
    <div>
      <div className="w-20">
        {/* <Select label="Select Month">
          {month.map((m) => (
            <Option>{m}</Option>
          ))}
        </Select> */}
      </div>
      {problemData && problemData.map((problem) =>
      (
      <div className="flex border rounded-lg h-24 mt-5 shadow-md">
        <div className="bg-[#526D82] rounded-l-lg shadow-md">
          <div className="w-24 flex justify-center items-center p-6">
            <WifiIcon className="text-white" />
          </div>
        </div>
        <div className="flex w-full px-5">
          <div className="flex flex-col justify-center">
            <Typography variant="h6">{problem.category}</Typography>
            <Typography variant="small">{problem.details}</Typography>
          </div>
        </div> 
      </div>
      ))} 
    </div>
  );
}
