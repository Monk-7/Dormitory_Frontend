import { Button, Option, Select } from "@material-tailwind/react";
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
export default function Lease() {
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
        <Button
          variant="gradient"
          size="sm"
          className="flex items-center gap-3 normal-case"
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
          Upload
        </Button>
      </div>
      <div className="flex w-full border rounded mt-5 p-5 h-[60vh] lg:h-96 items-center justify-center">
        No Data
      </div>
      <div className="flex justify-end mt-5">
        <Button>Save</Button>
      </div>
    </div>
  );
}
