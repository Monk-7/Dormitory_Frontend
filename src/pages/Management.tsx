import {
  Cog6ToothIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Dialog,
  DialogBody,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Option,
} from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import TenantDetail from "../components/TenantDetail";
import RoomDetail from "../components/RoomDetail";
import Lease from "../components/Lease";
import PaymentHistory from "../components/PaymentHistory";
import Report from "../components/Report";

import apiClient from "../services/apiClient";
import { getUserId } from "../services/userService";

import jsonData from "../jsonTest/Building.json";
import AddBuilding from "../components/Popup/AddBuilding";
import {
  AdjustmentsHorizontalIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import AddRoom from "../components/Popup/AddRoom";

const tabsData = [
  {
    label: "Room details",
    value: "detail",
    desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
  },
  {
    label: "Lease",
    value: "lease",
    desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Payment history",
    value: "payment",
    desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
  },
  {
    label: "Report history",
    value: "report",
    desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
  },
];

function Icon({ id, open }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

interface roomInterface {
  idRoom: string;
  idBuilding: string;
  roomName: string;
  roomPrice: number;
  furniturePrice: number;
  internetPrice: number;
  parkingPrice: number;
  timesTamp: Date;
}

interface buildingInterface {
  idBuilding: string;
  idDormitory: string;
  buildingName: string;
  waterPrice: number;
  electricalPrice: number;
  timesTamp: Date;
  roomAll: [roomInterface];
}

interface dormitoryInterface {
  idDormitory: string;
  idOwner: string;
  dormitoryName: string;
  address: string;
  phoneNumber: string;
  email: string;
  timesTamp: Date;
  buildingAll: [buildingInterface];
}

export default function Management() {
  const [roomData, setRoomData] = useState<dormitoryInterface>();
  const [accordionStates, setAccordionStates] = useState<boolean[]>([]);

  const handleToggleAccordion = (index: number) => {
    setAccordionStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  useEffect(() => {
    // const getDataAllRoom = async () => {
    //   const id = getUserId();
    //   if(id !== '')
    //   {
    //     try {

    //       const res = await apiClient(`https://localhost:7282/Api/Dormitory/GetDormitoryData/${id}`, {
    //         method: 'GET',
    //       });
    //       setRoomData(res.data);
    //       console.log(res);
    //     }
    //     catch (error)
    //     {
    //       console.log(error);
    //     }
    //   }
    // }

    // getDataAllRoom();

    setRoomData(jsonData);
    if (roomData && roomData.buildingAll) {
      setAccordionStates(
        Array.from({ length: roomData.buildingAll.length }, () => true)
      );
    }
  }, [roomData]);

  const [text, setText] = useState("ข้อความที่ต้องการแก้ไข");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const [openDelDormDialog, setOpenDelDormDialog] = React.useState(false);

  const handleDelDormDialog = () => setOpenDialog(!openDialog);
  const [openDelBuildDialog, setOpenDelBuildDialog] = React.useState(false);

  const handleOpenDelBuildDialog = () => setOpenDialog(!openDialog);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);

  useEffect(() => {
    if (isEditing) {
      // กระทำเมื่อเริ่มแก้ไข
      setEditedText(text);
    }
  }, [isEditing, text]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setText(editedText);
    setIsEditing(false);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10 min-w-[500px]">
      <div className="flex my-4 items-center justify-between">
        <Typography variant="h5" className="mr-5">
          Management
        </Typography>
        <div className="block md:hidden">
          <Popover placement="bottom-end">
            <PopoverHandler>
              <AdjustmentsHorizontalIcon className="w-6 cursor-pointer" />
            </PopoverHandler>
            <PopoverContent className="flex flex-col gap-2">
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
            </PopoverContent>
          </Popover>
        </div>
        <div className="hidden md:flex gap-2">
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
      <div className="flex justify-between">
        <div className="w-full lg:w-[70%]">
          <Card className="px-5 py-1 mb-5 lg:mr-5 h-fit overflow-auto min-w-[500px]">
            <Accordion open={open === 1}>
              <AccordionHeader className="font-Montserrat text-base border-b-0 cursor-default">
                <div className="flex justify-between w-full mr-[-16px]">
                  <div className="flex gap-4 items-center">
                    Dormitory
                    <PencilSquareIcon className="w-5 opacity-40 pb-1" />
                  </div>
                  <div className="flex gap-4">
                    <AddBuilding />
                    <TrashIcon width={22} />
                    <button onClick={() => handleOpen(1)}>
                      <Icon id={1} open={open} />
                    </button>
                  </div>
                </div>
              </AccordionHeader>
              <AccordionBody className="p-0 pb-2">
                {roomData &&
                  roomData.buildingAll &&
                  roomData.buildingAll.map((data, index) => (
                    <Card className="px-5 py-1 my-2 h-fit overflow-auto min-w-[500px] border shadow-none">
                      <Accordion key={index} open={accordionStates[index]}>
                        <AccordionHeader
                          className={`font-Montserrat text-base ${
                            accordionStates[index] === true ? "" : "border-b-0"
                          } cursor-default`}
                        >
                          <div className="flex justify-between w-full mr-[-16px]">
                            {isEditing ? (
                              <div className="flex">
                                <input
                                  type="text"
                                  value={editedText}
                                  onChange={(e) =>
                                    setEditedText(e.target.value)
                                  }
                                  onBlur={handleSave}
                                  onKeyDown={handleKeyPress}
                                  placeholder={data.buildingName}
                                  className="border-0 focus:outline-none"
                                />
                              </div>
                            ) : (
                              <div className="flex gap-4 items-center">
                                Building {data.buildingName}
                                <PencilSquareIcon
                                  className="w-5 opacity-40 pb-1 cursor-pointer"
                                  onClick={handleEditClick}
                                />
                              </div>
                            )}
                            {/* <div className="flex gap-4">
                            <TrashIcon width={22} /> */}
                            <div className="flex gap-4">
                              <AddRoom />
                              <TrashIcon width={22} />

                              <button
                                onClick={() => handleToggleAccordion(index)}
                              >
                                <Icon id={accordionStates[index]} open={true} />
                              </button>
                              {/* </div> */}
                            </div>
                          </div>
                        </AccordionHeader>
                        <AccordionBody className="grid grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10">
                          {data &&
                            data.roomAll &&
                            data.roomAll.map((data) => (
                              <Card className="flex m-1 h-14 rounded-md justify-center items-center border min-w-[85px] shadow-none">
                                <button className="hidden lg:block w-full h-full">
                                  <CheckCircleIcon
                                    color="green"
                                    className="absolute top-[-5px] right-[-5px] w-4 h-4"
                                  />
                                  {/* <ClockIcon
                                  color="#ECB92F"
                                  className="absolute top-[-5px] right-[-5px] w-4 h-4"
                                /> */}
                                  {/* <ExclamationCircleIcon
                                  color="#AE2012"
                                  className="absolute top-[-5px] right-[-5px] w-4 h-4"
                                /> */}
                                  <span>{data.roomName}</span>
                                </button>
                                <button
                                  className="block lg:hidden w-full h-full"
                                  onClick={handleOpenDialog}
                                >
                                  <CheckCircleIcon
                                    color="green"
                                    className="absolute top-[-5px] right-[-5px] w-4 h-4"
                                  />
                                  {/* <ClockIcon
                                  color="#ECB92F"
                                  className="absolute top-[-5px] right-[-5px] w-4 h-4"
                                /> */}
                                  {/* <ExclamationCircleIcon
                                  color="#AE2012"
                                  className="absolute top-[-5px] right-[-5px] w-4 h-4"
                                /> */}
                                  <span>{data.roomName}</span>
                                </button>
                              </Card>
                            ))}
                        </AccordionBody>
                      </Accordion>
                    </Card>
                  ))}
              </AccordionBody>
            </Accordion>
          </Card>
        </div>
        <Card className="hidden lg:block p-5 rounded-md w-[32%] min-w-[400px] h-fit !static">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Typography variant="h6" color="black">
                Room 101
              </Typography>
              <PencilSquareIcon className="w-5 opacity-40 pb-1" />
            </div>
            <Switch />
          </div>
          <Tabs value="detail">
            <TabsHeader className="flex items-center mt-5">
              {tabsData.map(({ label, value }) => (
                <Tab key={value} value={value} className="text-xs py-2">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="!py-0">
              <TabPanel
                key={tabsData[0].value}
                value={tabsData[0].value}
                className="!px-0 !pb-0"
              >
                <TenantDetail />
              </TabPanel>
              <TabPanel
                key={tabsData[1].value}
                value={tabsData[1].value}
                className="!px-0 !pb-0"
              >
                <Lease />
              </TabPanel>
              <TabPanel
                key={tabsData[2].value}
                value={tabsData[2].value}
                className="!px-0 !pb-0"
              >
                <PaymentHistory />
              </TabPanel>
              <TabPanel
                key={tabsData[3].value}
                value={tabsData[3].value}
                className="!px-0 !pb-0"
              >
                <Report />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </Card>
        <Dialog
          open={openDialog}
          handler={handleOpenDialog}
          className="lg:hidden"
        >
          <DialogBody>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Typography variant="h6" color="black">
                  Room 101
                </Typography>
                <PencilSquareIcon className="w-5 opacity-40 pb-1" />
              </div>
              <Switch />
            </div>
            <Tabs value="detail">
              <TabsHeader className="flex items-center mt-5">
                {tabsData.map(({ label, value }) => (
                  <Tab key={value} value={value} className="text-xs py-2">
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody className="!py-0">
                <TabPanel
                  key={tabsData[0].value}
                  value={tabsData[0].value}
                  className="!px-0 !pb-0"
                >
                  <TenantDetail />
                </TabPanel>
                <TabPanel
                  key={tabsData[1].value}
                  value={tabsData[1].value}
                  className="!px-0 !pb-0"
                >
                  <Lease />
                </TabPanel>
                <TabPanel
                  key={tabsData[2].value}
                  value={tabsData[2].value}
                  className="!px-0 !pb-0"
                >
                  <PaymentHistory />
                </TabPanel>
                <TabPanel
                  key={tabsData[3].value}
                  value={tabsData[3].value}
                  className="!px-0 !pb-0"
                >
                  <Report />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
}
