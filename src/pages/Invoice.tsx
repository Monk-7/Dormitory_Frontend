import AddBuilding from "../components/Popup/AddBuilding";
import Building from "./Management";
import { CalendarDaysIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Input,
  Option,
  Popover,
  PopoverContent,
  PopoverHandler,
  Select,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";

import apiClient from "../services/apiClient";
import { API } from "../services/configAPI";
import { getUserId } from "../services/userService";
import { useEffect, useState } from "react";

interface invoiceInterface {
  idInvoice: string,
  idRoom: string,
  roomName: number,
  roomPrice: number,
  electricityPrice: number,
  waterPrice: number,
  furniturePrice: number,
  internetPrice: number,
  parkingPrice: number,
  other: number,
  total: number,
  dueDate : Date,
  timesTamp : Date,
  status : boolean
}

interface getInvoiceInterface {
  idDormitory: string;
  idBuilding: string;
  buildingName: string;
  dormitoryName: string;
  invoiceAll : invoiceInterface[]
}

export default function Invoice() {

  const [invioceData, setInvioceData] = useState<getInvoiceInterface[]>([]);
  const [invioceDefaultData, setInvioceDefaultData] = useState<getInvoiceInterface[]>([]);

  const [selectedDormitoryId, setSelectedDormitoryId] = useState<string>('');

  const getDataInvoice = async () => {
    const id = getUserId();
    if(id !== '') {
      try {
        const res = await apiClient(`${API}/Meter/GetAndCreateMeter/${id}`, {
          method: 'GET',
        });

        const meterData = {
          idUser : id,
          meterAll : res.data
        }

        try {
          const resInvoice = await apiClient(`${API}/Invoice/CreateInvoice`, {
            method: 'POST',
            data: meterData
          });
          setInvioceData(resInvoice.data);
          setInvioceDefaultData(resInvoice.data);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
  
    getDataInvoice();
    
  }, []);

  const TABLE_HEAD = [
    "Room No.",
    "Room Fee",
    "Internet Fee",
    "Others",
    "Eletrical Fee",
    "Water Fee",
    "Total",
    "Status",
  ];

  const check = () => {
    console.log(invioceData);
  }

  const getSelectDataDormitory = (idDormitory:string) => {
    const filteredData = invioceDefaultData.filter(data => data.idDormitory === idDormitory);
    setInvioceData(filteredData);
  }

  const getSelectDataBuilding = (idBuilding:string) => {
    const filteredData = invioceDefaultData.filter(data => data.idBuilding === idBuilding);
    setInvioceData(filteredData);
  }

  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10 min-w-[500px]">
      {/* <button onClick={check}>CHECK</button> */}
      <div className="flex justify-between items-center">
        <Typography variant="h5">Invoice</Typography>
        <div className="flex w-70 gap-2">
          <Select 
            onChange={(val) => {setSelectedDormitoryId(val); getSelectDataDormitory(val)}}
            label="Select Dormitory">
            {invioceDefaultData.reduce((uniqueDormitories, invoData) => {
              if (!uniqueDormitories.includes(invoData.idDormitory)) {
                uniqueDormitories.push(invoData.idDormitory);
              }
              return uniqueDormitories;
            }, []).map((dormitoryId, index) => {
              const invoData = invioceDefaultData.find(item => item.idDormitory === dormitoryId);
              return <Option key={index} value={invoData?.idDormitory}>{invoData.dormitoryName}</Option>;
            })}
          </Select>
          <Select 
            onChange={(val) => {getSelectDataBuilding(val)}}
            label="Select Building" disabled = {selectedDormitoryId === ''}>
              {invioceDefaultData
                .filter(meterData => meterData.idDormitory === selectedDormitoryId) // กรองข้อมูลเพื่อให้เหลือเฉพาะที่มี idDormitory เดียวกับที่เลือกไว้
                .map((meterData, index) => (
                  <Option key={index} value={meterData?.idBuilding} >{meterData.buildingName}</Option> // แสดงชื่อตึก
                ))}
          </Select>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="w-80 border-l-[3px] px-5 py-2 border-black font-bold">
          All Building
        </div>
        <Popover placement="bottom-end">
          <PopoverHandler>
            <Button className="flex gap-2 items-center">
              <CalendarDaysIcon className="w-5 h-5" />
              Invoice Setting
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <Typography variant="h6">Invoice Setting</Typography>
            <Typography>Set your send invioce time</Typography>
            <div className="flex flex-col">
              <div className="grid grid-cols-3 items-center mt-5 gap-3">
                <label className="text-right">Building Name</label>
                <div className="col-span-2">
                  <Select
                    size="md"
                    label="Select Building"
                    className="col-span-2"
                  >
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center mt-5 gap-3">
                <label className="text-right">Date</label>
                <div className="col-span-2">
                  <Select size="md" label="Select Date" className="col-span-2">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center mt-5 gap-3">
                <label className="text-right">Month</label>
                <div className="col-span-2">
                  <Select size="md" label="Select Month">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center mt-5 gap-3">
                <label className="text-right">Time</label>
                <div className="flex gap-2 col-span-2">
                  <Select size="md" label="Select Time">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </Select>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {invioceData && invioceData.map((dormData) => (
      <div className="px-5 mt-5 border rounded-lg overflow-auto">
        <p className="font-bold my-5">{dormData.dormitoryName} | Building {dormData.buildingName} </p>
        <table className="w-full min-w-max table-auto text-center mb-5 ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dormData.invoiceAll.map((invoice) => (
                <tr key={invoice.roomName} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {invoice.roomName}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {invoice.roomPrice}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {invoice.internetPrice}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {invoice.other}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {invoice.electricityPrice}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {invoice.waterPrice}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {invoice.total}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {invoice.status}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      ))}
      <div className="flex justify-end mt-5">
        <Button onClick ={() => {alert("ส่งใบแจ้งหนี้สำเร็จ")}}className="flex items-center gap-2">
          <PaperAirplaneIcon className="h-5 w-5" />
          Send All
        </Button>
      </div>
    </div>
  );
}
