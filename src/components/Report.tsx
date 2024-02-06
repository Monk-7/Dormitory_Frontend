import { WifiIcon } from "@heroicons/react/24/outline";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import React from "react";

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
export default function Report() {
  return (
    <div>
      <div className="w-20">
        <Select label="Select Month">
          {month.map((m) => (
            <Option>{m}</Option>
          ))}
        </Select>
      </div>
      <div className="flex border rounded-lg h-24 mt-5 shadow-md">
        <div className="bg-[#526D82] rounded-l-lg shadow-md">
          <div className="w-24 flex justify-center items-center p-6">
            <WifiIcon className="text-white" />
          </div>
        </div>
        <div className="flex w-full px-5">
          <div className="flex flex-col justify-center">
            <Typography variant="h6">Internet</Typography>
            <Typography variant="small">internet not working</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
