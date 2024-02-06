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

export default function Invoice() {
  const tabsData = [
    {
      label: "Electrical Fee",
      value: "efee",
    },
    {
      label: "Water Fee",
      value: "wfee",
    },
  ];

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

  const TABLE_ROWS = [
    {
      roomno: "101",
      roomfee: "500",
      internetfee: "600",
      other: "100",
      eletricfee: "100",
      waterfee: "100",
      total: "100",
      status: "",
    },
    {
      roomno: "101",
      roomfee: "500",
      internetfee: "600",
      other: "100",
      eletricfee: "100",
      waterfee: "100",
      total: "100",
      status: "",
    },
    {
      roomno: "101",
      roomfee: "500",
      internetfee: "600",
      other: "100",
      eletricfee: "100",
      waterfee: "100",
      total: "100",
      status: "",
    },
    {
      roomno: "101",
      roomfee: "500",
      internetfee: "600",
      other: "100",
      eletricfee: "100",
      waterfee: "100",
      total: "100",
      status: "",
    },
    {
      roomno: "101",
      roomfee: "500",
      internetfee: "600",
      other: "100",
      eletricfee: "100",
      waterfee: "100",
      total: "100",
      status: "",
    },
  ];

  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10 min-w-[500px]">
      <div className="flex justify-between items-center">
        <Typography variant="h5">Invoice</Typography>
        <div className="flex w-70 gap-2">
          <Select label="Select Domitory">
            <Option>Domitory A</Option>
            <Option>Domitory B</Option>
            <Option>Domitory C</Option>
          </Select>
          <Select label="Select Building" disabled>
            <Option>Building A</Option>
            <Option>Building B</Option>
            <Option>Building C</Option>
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
      <div className="px-5 mt-5 border rounded-lg overflow-auto">
        <p className="font-bold my-5">2023 December</p>
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
            {TABLE_ROWS.map(
              ({
                roomno,
                roomfee,
                internetfee,
                other,
                eletricfee,
                waterfee,
                total,
                status,
              }) => (
                <tr key={roomno} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {roomno}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {roomfee}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {internetfee}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {other}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {eletricfee}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {waterfee}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {total}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {status}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-5">
        <Button className="flex items-center gap-2">
          <PaperAirplaneIcon className="h-5 w-5" />
          Send All
        </Button>
      </div>
    </div>
  );
}
