import { CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const year = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
];

function Icon({ id, open }: any) {
  return (
    <div className="flex items-center">
      <div className="flex items-center text-green-400 mx-2">
        Success
        <CheckCircleIcon width={22} className="ml-2" />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-4 w-4 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  );
}

export default function PaymentHistory() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);
  return (
    <div>
      <div className="w-20">
        <Select label="Select Year">
          {year.map((y) => (
            <Option>{y}</Option>
          ))}
        </Select>
      </div>
      <Accordion
        open={open === 1}
        icon={<Icon id={1} open={open} />}
        className="border px-4 rounded shadow-sm mt-5"
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="text-sm border-none"
        >
          Rental Invoice September / 2023
        </AccordionHeader>
        <AccordionBody className="py-0 border-t">
          <div className="border-b">
            <div className="flex justify-between my-5">
              <Typography variant="small">Room fee</Typography>
              <Typography variant="small">3,500 ฿</Typography>
            </div>
            <div className="flex justify-between my-5">
              <Typography variant="small">Furniture fee</Typography>
              <Typography variant="small">1,500 ฿</Typography>
            </div>
            <div className="flex justify-between my-5">
              <Typography variant="small">Internet fee</Typography>
              <Typography variant="small">300 ฿</Typography>
            </div>
            <div className="flex justify-between my-5">
              <Typography variant="small">Parking fee</Typography>
              <Typography variant="small">100 ฿</Typography>
            </div>
            <div className="flex justify-between my-5">
              <div>
                <Typography variant="small">Room fee</Typography>
                <Typography className="text-xs">196 - 192 = 4 units</Typography>
              </div>
              <Typography variant="small">68 ฿</Typography>
            </div>
            <div className="flex justify-between my-5">
              <div>
                <Typography variant="small">Room fee</Typography>
                <Typography className="text-xs">
                  8,000 - 7800 = 200 units
                </Typography>
              </div>
              <Typography variant="small">1,600 ฿</Typography>
            </div>
          </div>
          <div className="flex justify-between my-5">
            <Typography variant="small" className="font-bold">
              Total
            </Typography>
            <Typography variant="small" className="font-bold">
              7,068 ฿
            </Typography>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
}
