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
import { API } from "../services/configAPI";
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
import DeletePopup from "../components/Popup/DeletePopup";

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

interface roomStatusInterface {
  idRoom: string;
  roomName: string;
  isRoomStay: boolean;
  isRoomPay: boolean;
  isRoomLatePay: boolean;
}

interface buildingInfoInterface {
  idBuilding: string;
  idDormitory: string;
  buildingName: string;
  waterPrice: number;
  electricalPrice: number;
  timesTamp: Date;
  roomInfo: roomStatusInterface[];
}

interface dormitoryInfoInterface {
  idDormitory: string;
  idOwner: string;
  dormitoryName: string;
  address: string;
  phoneNumber: string;
  email: string;
  timesTamp: Date;
  buildingInfo: buildingInfoInterface[];
}

interface buildingInterface {
  idBuilding: string;
  idDormitory: string;
  buildingName: string;
  waterPrice: number;
  electricalPrice: number;
  timesTamp: Date;
}

interface dormitoryInterface {
  idDormitory: string;
  idOwner: string;
  dormitoryName: string;
  address: string;
  phoneNumber: string;
  email: string;
  timesTamp: Date;
}


export default function Management() {

  const [dormitoryDefaultData, setDormitoryDefaultData] = useState<dormitoryInfoInterface[]>([]);
  const [dormitoryData, setDormitoryData] = useState<dormitoryInfoInterface[]>([]);
  const [dormitoryAPI, setDormitoryAPI] = useState<dormitoryInterface[]>([]);
  const [valueSelectedDormitory, setValueSelectedDormitory] = useState<number>(-1);


  const [roomName,setRoomName] = useState<string>('NO DATA');
  const [idRoom,setIdRoom] = useState<string>('');


  const getDataDorm = async () => {
    const id = getUserId();
    if(id !== '') {
      try {
        const res = await apiClient(`${API}/Dormitory/GetAllDormitory/${id}`, {
          method: 'GET',
        });
        setDormitoryAPI(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const getBuildData = async (_dorm:dormitoryInterface[]) => {
      try {
        const buildingPromises = _dorm && _dorm.map(async (dormitory) => {
          const res = await apiClient(`${API}/Building/GetAllBuilding/${dormitory.idDormitory}`, {
            method: 'GET',
          });
          return res.data;
        });
        const buildingResults = await Promise.all(buildingPromises);
        const flattenedBuildingData: buildingInterface[] = buildingResults.flatMap((buildingArray: any[]) => buildingArray) as buildingInterface[];
        return flattenedBuildingData;
      } catch (error) {
        console.error(error);
      }
  };
  
  const getRoomStatusData = async (_building: buildingInterface[]) => {
    try {
      const buildingAndRoomPromises = _building && _building.map(async (building) => {
        const res = await apiClient(`${API}/Room/GetAllRoomStatus/${building.idBuilding}`, {
          method: 'GET',
        });
  
        return {
          ...building,
          roomInfo: res.data,
        };
      });

      const buildingAndRoomResults = await Promise.all(buildingAndRoomPromises);
      return buildingAndRoomResults;
    } catch (error) {
      console.error(error);
    }
  };

  const mergeData = (dorm:dormitoryInterface[],buildingAndRoomResults:buildingInfoInterface[]) =>
  {
    const updatedDormitoryData = dorm.map(dormitory => {
      // ค้นหา building ที่มี idDormitory ตรงกับ idDormitory ของ dormitory ปัจจุบัน
      const matchingBuilding = buildingAndRoomResults.filter(building => building.idDormitory === dormitory.idDormitory);
      if (matchingBuilding) {
        // ถ้าพบ building ที่ตรงกัน ให้นำข้อมูลของ building มาใส่ใน buildingInfo ของ Dormitory นั้น ๆ
        return {
          ...dormitory,
          buildingInfo: matchingBuilding
        };
      }
      // ถ้าไม่พบ building ที่ตรงกัน ให้คงเดิม
      return dormitory;
    });
    setDormitoryData(updatedDormitoryData);
    setDormitoryDefaultData(updatedDormitoryData);
  }

  useEffect(() => {
    const getData = async () =>
    {
      getDataDorm();
    }
    
    getData();
    // if (dormitoryData && roomData.buildingAll) {
    //   setAccordionStates(
    //     Array.from({ length: roomData.buildingAll.length }, () => true)
    //   );
    // }

  }, []);

  useEffect(() => {
    const getData = async () =>
    {
      const buildData : buildingInterface[] = await getBuildData(dormitoryAPI);
      const roomData = await getRoomStatusData(buildData);
      mergeData(dormitoryAPI,roomData);
    }
    getData();

  }, [dormitoryAPI]);

  const [text, setText] = useState("ข้อความที่ต้องการแก้ไข");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const [openDelDormDialog, setOpenDelDormDialog] = React.useState(false);
  const handleDelDormDialog = () => setOpenDelDormDialog(!openDelDormDialog);

  const [openDelBuildDialog, setOpenDelBuildDialog] = React.useState(false);
  const handleOpenDelBuildDialog = () => setOpenDelBuildDialog(!openDelBuildDialog);

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

  const [openAccordionDromIndexes, setOpenAccordionDromIndexes] = useState<boolean[]>([]);

  const handleToggleAccordionDorm = (index: number) => {
    setOpenAccordionDromIndexes((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  const [openAccordionBuildIndexes, setOpenAccordionBuildIndexes] = useState<boolean[]>([]);

  const handleToggleAccordionbuild = (index: number) => {
    setOpenAccordionBuildIndexes((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  const setNewDataSelected = (val:number) =>
  {
    const selectedDormitory = dormitoryDefaultData[valueSelectedDormitory];
    const selectedBuilding = dormitoryDefaultData[valueSelectedDormitory].buildingInfo[val];

    setDormitoryData([{
      ...selectedDormitory,
      buildingInfo: [selectedBuilding]
    }]);

  }

  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10 min-w-[500px]">
      {/* <button onClick={check}>check</button> */}
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
            <Select
              label="Select Domitory"
              onChange={(val) => {setValueSelectedDormitory(parseInt(val)); setDormitoryData([dormitoryDefaultData[parseInt(val)]]);}}>
              {dormitoryDefaultData &&
                dormitoryDefaultData.map((dormData, dormIndex) => (
                  <Option key={dormIndex} value={dormIndex.toString()}>
                    Dormitory {dormData.dormitoryName}
                  </Option>
                ))}
            </Select>
            <Select
              label="Select Building"
              disabled={valueSelectedDormitory === -1}
              onChange={(val) => {
                setNewDataSelected(parseInt(val));
              }}>
              {dormitoryDefaultData && dormitoryDefaultData[valueSelectedDormitory] && dormitoryDefaultData[valueSelectedDormitory].buildingInfo ?
                dormitoryDefaultData[valueSelectedDormitory].buildingInfo.map((building, buildingIndex) => (
                  <Option key={building.idBuilding} value={buildingIndex.toString()}>{building.buildingName}</Option>
                )) : <span>NO DATA</span>}
            </Select>
            </PopoverContent>
          </Popover>
        </div>
        <div className="hidden md:flex gap-2">
          <Select
            label="Select Domitory"
            onChange={(val) => {setValueSelectedDormitory(parseInt(val)); setDormitoryData([dormitoryDefaultData[parseInt(val)]]);}}>
            {dormitoryDefaultData &&
              dormitoryDefaultData.map((dormData, dormIndex) => (
                <Option key={dormIndex} value={dormIndex.toString()}>
                  Dormitory {dormData.dormitoryName}
                </Option>
              ))}
          </Select>
          <Select
            label="Select Building"
            disabled={valueSelectedDormitory === -1}
            onChange={(val) => {
              setNewDataSelected(parseInt(val));
            }}>
            {dormitoryDefaultData && dormitoryDefaultData[valueSelectedDormitory] && dormitoryDefaultData[valueSelectedDormitory].buildingInfo ?
              dormitoryDefaultData[valueSelectedDormitory].buildingInfo.map((building, buildingIndex) => (
                <Option key={building.idBuilding} value={buildingIndex.toString()}>{building.buildingName}</Option>
              )) : <span>NO DATA</span>}
          </Select>
        </div>
      </div>
      <div className="flex justify-between">
      <div className="w-full lg:w-[70%] ">
          {dormitoryData && dormitoryData.map((dormData,dormIndex) =>
          (
            <Card className="px-5 py-1 mb-5 lg:mr-5 h-fit overflow-auto min-w-[500px]">
              <Accordion open={openAccordionDromIndexes[dormIndex]}>
                <AccordionHeader className="font-Montserrat text-base border-b-0 cursor-default">
                  <div className="flex justify-between w-full mr-[-16px]">
                    <div className="flex gap-4 items-center">
                      Dormitory {dormData.dormitoryName}
                      <PencilSquareIcon className="w-5 opacity-40 pb-1" />
                    </div>
                    <div className="flex gap-4">
                      <AddBuilding data={dormData.idDormitory} />
                      <button onClick={handleDelDormDialog}>
                        <TrashIcon width={22} />
                      </button>
                      <DeletePopup open={openDelDormDialog} handleDialog={handleDelDormDialog} />
                      <button onClick={() => handleToggleAccordionDorm(dormIndex)}>
                        <Icon id={dormIndex} open={openAccordionDromIndexes[dormIndex]} />
                      </button>
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody className="p-0 pb-2">
                  {dormData &&
                    dormData.buildingInfo &&
                    dormData.buildingInfo.map((buildingData, buildingIndex) => (
                      <Card className="px-5 py-1 my-2 h-fit overflow-auto min-w-[500px] border shadow-none">
                        <Accordion  key={buildingIndex} open={openAccordionBuildIndexes[buildingIndex]}>
                          <AccordionHeader
                            className={`font-Montserrat text-base ${
                              openAccordionBuildIndexes[buildingIndex] === true ? "" : "border-b-0"
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
                                    placeholder={buildingData.buildingName}
                                    className="border-0 focus:outline-none"
                                  />
                                </div>
                              ) : (
                                <div className="flex gap-4 items-center">
                                  Building {buildingData.buildingName}
                                  <PencilSquareIcon
                                    className="w-5 opacity-40 pb-1 cursor-pointer"
                                    onClick={handleEditClick}
                                  />
                                </div>
                              )}
                              {/* <div className="flex gap-4">
                              <TrashIcon width={22} /> */}
                              <div className="flex gap-4">
                                <AddRoom data = {buildingData.idBuilding}/>
                                <button onClick={handleOpenDelBuildDialog}>
                                  <TrashIcon width={22} />
                                </button>
                                <DeletePopup open={openDelBuildDialog} handleDialog={handleOpenDelBuildDialog} />
                                <button
                                  onClick={() => handleToggleAccordionbuild(buildingIndex)}
                                >
                                  <Icon id={openAccordionBuildIndexes[buildingIndex]} open={true} />
                                </button>
                                {/* </div> */}
                              </div>
                            </div>
                          </AccordionHeader>
                          <AccordionBody className="grid grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10">
                            {buildingData &&
                              buildingData.roomInfo &&
                              buildingData.roomInfo.map((roomData) => (
                                <div>
                                  {roomData.isRoomStay ?
                                    <Card className="flex m-1 h-14 rounded-md justify-center items-center border min-w-[85px] shadow-none bg-prim hover:bg-prim2 ">
                                      <button className="hidden lg:block w-full h-full" onClick={() => {setRoomName(roomData.roomName); setIdRoom(roomData.idRoom);}} >
                                      {roomData.isRoomLatePay ? <ExclamationCircleIcon color="#AE2012" className="absolute top-[-5px] right-[-5px] w-4 h-4"/> 
                                        :
                                        roomData.isRoomPay ? <CheckCircleIcon  className="absolute top-[-5px] right-[-5px] w-4 h-4 text-success"  /> 
                                        : 
                                        <ClockIcon  className="absolute top-[-5px] right-[-5px] w-4 h-4 text-clock "/>
                                      }  
                                        <span className="font-bold text-base text-a">{roomData.roomName}</span>
                                      </button>
                                      <button
                                        className="block lg:hidden w-full h-full"
                                        onClick={handleOpenDialog}
                                      >
                                        {roomData.isRoomLatePay ? <ExclamationCircleIcon color="#AE2012" className="absolute top-[-5px] right-[-5px] w-4 h-4"/> 
                                          :
                                          roomData.isRoomPay ? <CheckCircleIcon  className="absolute top-[-5px] right-[-5px] w-4 h-4 text-success " /> 
                                          : 
                                          <ClockIcon  className="absolute top-[-5px] right-[-5px] w-4 h-4 text-clock"/>
                                        }  
                                        <span className="font-bold text-base text-white">{roomData.roomName}</span>
                                      </button>
                                    </Card>
                                  :
                                  <Card className="flex m-1 h-14 rounded-md justify-center items-center border min-w-[85px] shadow-none hover:bg-[#fff595] focus:outline-none focus:ring focus:ring-red-300">
                                    <button className="hidden lg:block w-full h-full" onClick={() => {setRoomName(roomData.roomName); setIdRoom(roomData.idRoom);}} >
                                      <ClockIcon  className="absolute top-[-5px] right-[-5px] w-4 h-4 text-clock"/> 
                                      <span className="font-bold text-base">{roomData.roomName}</span>
                                    </button>                                    
                                    <button
                                      className="block lg:hidden w-full h-full"
                                      onClick={handleOpenDialog}>            
                                      <ClockIcon color="#ECB92F" className="absolute top-[-5px] right-[-5px] w-4 h-4 text-clock"/>                                      
                                      <span className="font-bold text-base ">{roomData.roomName}</span>
                                    </button>
                                  </Card>
                                  }
                                  
                                </div>  
                              ))}
                          </AccordionBody>
                        </Accordion>
                      </Card>
                    ))}
                </AccordionBody>
              </Accordion>
            </Card>
          ))}
        </div>
        <Card className="hidden lg:block p-5 rounded-md w-[32%] min-w-[400px] h-fit !static ">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center ">
              <Typography variant="h6" color="black">
                Room {roomName}
              </Typography>
              <PencilSquareIcon className="w-5 opacity-40 pb-1" />
            </div>
            <Switch />
          </div>
          <Tabs value="detail">
            <TabsHeader className="flex items-center mt-5 bg-prim ">
              {tabsData.map(({ label, value }) => (
                <Tab key={value} value={value} className="text-xs px-0 py-1">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody >
              <TabPanel 
                key={tabsData[0].value}
                value={tabsData[0].value}
                
              >
                <TenantDetail data = {idRoom} />
              </TabPanel>
              <TabPanel
                key={tabsData[1].value}
                value={tabsData[1].value}
                
              >
                <Lease data = {idRoom}/>
              </TabPanel>
              <TabPanel
                key={tabsData[2].value}
                value={tabsData[2].value}
                
              >
                <PaymentHistory data = {idRoom} />
              </TabPanel>
              <TabPanel
                key={tabsData[3].value}
                value={tabsData[3].value}
                
              >
                <Report data = {idRoom} />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </Card>
        <Dialog
          open={openDialog}
          handler={handleOpenDialog}
          className="lg:hidden "
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
                  <TenantDetail data ={idRoom} />
                </TabPanel>
                <TabPanel
                  key={tabsData[1].value}
                  value={tabsData[1].value}
                  className="!px-0 !pb-0 "
                >
                  <Lease data ={idRoom} />
                </TabPanel>
                <TabPanel
                  key={tabsData[2].value}
                  value={tabsData[2].value}
                  className="!px-0 !pb-0"
                >
                  <PaymentHistory data ={idRoom} />
                </TabPanel>
                <TabPanel
                  key={tabsData[3].value}
                  value={tabsData[3].value}
                  className="!px-0 !pb-0"
                >
                  <Report data ={idRoom} />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
}
