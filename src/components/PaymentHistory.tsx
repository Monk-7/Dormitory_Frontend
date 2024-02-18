import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {API} from "../services/configAPI";
import apiClient from "../services/apiClient";

interface invoiceInterface {

  idInvoice: string;
  idRoom: string;
  roomName: number;
  roomPrice: number;
  electricityPrice: number;
  waterPrice: number;
  electricityUnit: number;
  waterUnit: number;
  furniturePrice: number;
  internetPrice: number;
  parkingPrice: number;
  other: number;
  total: number;
  status: boolean;
  dueDate: string;
  timesTamp: string;
}

interface invoiceTimeInterface {

  idInvoice: string;
  idRoom: string;
  roomName: number;
  roomPrice: number;
  electricityPrice: number;
  waterPrice: number;
  electricityUnit: number;
  waterUnit: number;
  furniturePrice: number;
  internetPrice: number;
  parkingPrice: number;
  other: number;
  total: number;
  status: boolean;
  dueDate: Date;
  timesTamp: Date;
}

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

function Icon({ id, open ,status}: any) {
  return (
    <div>
      {status ?
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
      :
        <div className="flex items-center">    
          <div className="flex items-center text-yellow-500 mx-2">
            Pending
            <ClockIcon width={22} className="ml-1" />
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
      }
    </div>
    
  );
}



export default function PaymentHistory({ data }: { data: string }) {

  const [open, setOpen] = useState(0);
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  const [invoiceData,setInvoiceData] = useState<invoiceTimeInterface[]>([]);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const getData = async () =>
  {
    try { 
      const res = await apiClient(
        `${API}/Invoice/GetInvoicesHistory/${data}`,
        {
          method: "GET",
        }
      );
      console.log(res.data);

      const invoicesWithDateConverted = res.data.map((item: invoiceInterface) => setDate(item));
      setInvoiceData(invoicesWithDateConverted);
      
    } catch (error) {
      console.log(error);
    }
  }

  const setDate = (_data: invoiceInterface) => {
    const newData: invoiceTimeInterface = {
      ..._data,
      dueDate: new Date(_data.dueDate), // แปลง dueDate เป็น Date
      timesTamp: new Date(_data.timesTamp) // แปลง timesTamp เป็น Date
    };
  
    return newData;
  }

  useEffect(() => {
  
    getData();
    
  }, [data]);

  return (
    <div>
      <div className="w-20">
        <Select label="Select Year">
          {year.map((y) => (
            <Option>{y}</Option>
          ))}
        </Select>
      </div>
      {invoiceData && invoiceData.map((ivData,index) => (
        <Accordion
          open={open === 1}
          icon={<Icon id={1} open={open} status = {ivData.status} />}
          className="border px-4 rounded shadow-sm mt-5"
        >
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="text-sm border-none"
          >
            Invoice {months[ivData.timesTamp.getMonth()]} / {ivData.timesTamp.getFullYear()}
          </AccordionHeader>
          <AccordionBody className="py-0 border-t">
            <div className="border-b">
              <div className="flex justify-between my-5">
                <Typography variant="small">Room fee</Typography>
                <Typography variant="small">{ivData.roomPrice}฿</Typography>
              </div>
              <div className="flex justify-between my-5">
                <Typography variant="small">Furniture fee</Typography>
                <Typography variant="small">{ivData.furniturePrice} ฿</Typography>
              </div>
              <div className="flex justify-between my-5">
                <Typography variant="small">Internet fee</Typography>
                <Typography variant="small">{ivData.internetPrice} ฿</Typography>
              </div>
              <div className="flex justify-between my-5">
                <Typography variant="small">Parking fee</Typography>
                <Typography variant="small">{ivData.parkingPrice} ฿</Typography>
              </div>
              <div className="flex justify-between my-5">
                <div>
                  <Typography variant="small">Electricity fee</Typography>
                  <Typography className="text-xs">{ivData.electricityUnit} units</Typography>
                </div>
                <Typography variant="small">{ivData.electricityPrice} ฿</Typography>
              </div>
              <div className="flex justify-between my-5">
                <div>
                  <Typography variant="small">Water fee</Typography>
                  <Typography className="text-xs">
                  {ivData.waterUnit} units
                  </Typography>
                </div>
                <Typography variant="small">{ivData.waterPrice} ฿</Typography>
              </div>
            </div>
            <div className="flex justify-between my-5">
              <Typography variant="small" className="font-bold">
                Total
              </Typography>
              <Typography variant="small" className="font-bold">
              {ivData.total} ฿
              </Typography>
            </div>
          </AccordionBody>
        </Accordion>
      ))}
      
    </div>
  );
}
