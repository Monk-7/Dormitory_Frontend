import AddBuilding from "../components/Popup/AddBuilding";
import { ArrowDownOnSquareIcon, ArrowUpOnSquareIcon, FunnelIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Option,
  Select,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";

import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { API } from "../services/configAPI";
import { getUserId } from "../services/userService";
import { saveAs } from 'file-saver';

import jsonData from "../jsonTest/Meter.json";

interface meterPrevInterface {
  idMeter: string;
  idDormitory: string;
  idBuilding: string;
  buildingName: string;
  dormitoryName: string;
  timesTamp: Date;
  meterRoomAll: [meterRoomAllPrevInterface];
}

interface meterRoomAllPrevInterface {
  idMeterRoom: string;
  idRoom: string;
  roomName: string;
  electricity: number;
  water: number;
  electricityPrev: number;
  waterPrev: number;
}

interface meterUpdateInterface {
  idMeter: string;
  idDormitory: string;
  meterRoomAll: meterRoomAllUpdateInterface[];
}

interface meterRoomAllUpdateInterface {
  idMeterRoom: string;
  electricity: number;
  water: number;
}

export default function Meter() {
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
    "Unit (Last Month)",
    "Unit (This Month)",
    "Used Units",
  ];

  const [meterPrevData, setPrevMeterData] = useState<meterPrevInterface[]>([]);
  const [meterPrevDefaultData, setPrevMeterDefaultData] = useState<
    meterPrevInterface[]
  >([]);
  const [checkTabsData, setTabsData] = useState<string>("efee");
  const [selectedDormitoryId, setSelectedDormitoryId] = useState<string>("");

  const [inputValues, setInputValues] = useState<{
    [idMeterRoom: string]: { electricity: number; water: number };
  }>({});

  const [files, setFiles] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFiles(file);
    } else {
      alert(".xlsx File only");
      setFiles(undefined);
    }
  };

  const getImgProFile = async () => {
    try {
      const idUser = getUserId()
      const res = await apiClient(`${API}/Meter/ExportFile/${idUser}`, {
        responseType: "blob",
        method: "GET",
      });

      const blob = new Blob([res.data]);
      saveAs(blob, 'meter.xlsx');
      
    } catch (error) {
      console.log(error);
    }
  };

  const sendContractData = async () => {
    const formData = new FormData();
    formData.append(`file`, files);
    try {
      const res = await apiClient(`${API}/Meter/UploadFile`, {
        method: "POST",
        data: formData,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeMeter = (
    idMeterRoom: string,
    type: string,
    value: number
  ) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [idMeterRoom]: {
        ...prevValues[idMeterRoom],
        [type]: value,
      },
    }));

    console.log(inputValues);
  };

  const handleSaveMeterData = async () => {
    const updatedMeterData: meterUpdateInterface[] = [];

    meterPrevData.forEach((prevMeter) => {
      const updatedMeterRoomAll: meterRoomAllUpdateInterface[] =
        prevMeter.meterRoomAll.map((prevRoom) => ({
          idMeterRoom: prevRoom.idMeterRoom,
          electricity:
            inputValues[prevRoom.idMeterRoom]?.electricity ||
            prevRoom.electricity,
          water: inputValues[prevRoom.idMeterRoom]?.water || prevRoom.water,
        }));

      updatedMeterData.push({
        idMeter: prevMeter.idMeter,
        idDormitory: prevMeter.idDormitory,
        meterRoomAll: updatedMeterRoomAll,
      });
    });

    console.log(updatedMeterData);
    try {
      const res = await apiClient(`${API}/Meter/UpdateMeter`, {
        method: "PUT",
        data: updatedMeterData,
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectDataDormitory = (idDormitory: string) => {
    const filteredData = meterPrevDefaultData.filter(
      (data) => data.idDormitory === idDormitory
    );
    setPrevMeterData(filteredData);
  };

  const getSelectDataBuilding = (idBuilding: string) => {
    const filteredData = meterPrevDefaultData.filter(
      (data) => data.idBuilding === idBuilding
    );
    setPrevMeterData(filteredData);
  };

  useEffect(() => {
    const getDataAllMeterPrev = async () => {
      const id = getUserId();
      if (id !== "") {
        try {
          const res = await apiClient(`${API}/Meter/GetAndCreateMeter/${id}`, {
            method: "GET",
          });
          setPrevMeterData(res.data);
          setPrevMeterDefaultData(res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getDataAllMeterPrev();

    //setPrevMeterData(jsonData);
  }, []);

  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10 min-w-[500px]">
      <div className="flex justify-between items-center">
        <Typography variant="h5">Meter</Typography>
        <div className="flex gap-5">
          <Select
            onChange={(val) => {
              setSelectedDormitoryId(val);
              getSelectDataDormitory(val);
            }}
            label="Select Dormitory"
          >
            {meterPrevDefaultData
              .reduce((uniqueDormitories, meterData) => {
                if (!uniqueDormitories.includes(meterData.idDormitory)) {
                  uniqueDormitories.push(meterData.idDormitory);
                }
                return uniqueDormitories;
              }, [])
              .map((dormitoryId, index) => {
                const dormitoryData = meterPrevDefaultData.find(
                  (item) => item.idDormitory === dormitoryId
                );
                return (
                  <Option key={index} value={dormitoryData?.idDormitory}>
                    {dormitoryData.dormitoryName}
                  </Option>
                );
              })}
          </Select>
          <Select
            onChange={(val) => {
              getSelectDataBuilding(val);
            }}
            label="Select Building"
            disabled={selectedDormitoryId === ""}
          >
            {meterPrevDefaultData
              .filter(
                (meterData) => meterData.idDormitory === selectedDormitoryId
              ) // กรองข้อมูลเพื่อให้เหลือเฉพาะที่มี idDormitory เดียวกับที่เลือกไว้
              .map((meterData, index) => (
                <Option key={index} value={meterData?.idBuilding}>
                  {meterData.buildingName}
                </Option> // แสดงชื่อตึก
              ))}
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 ">
        <div className="w-80  rounded-md">
          <Tabs value="efee">
            <TabsHeader className="bg-prim/[80%]  ">
              {tabsData.map(({ label, value }) => (
                <Tab
                  onClick={() => {
                    setTabsData(value);
                  }}
                  key={value}
                  value={value}
                  className="font-bold text-e text-[15px] py-2"
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
        <div className="flex gap-5">
        <Button onClick={getImgProFile} variant="outlined" className="flex items-center rounded-md font-semibold gap-2">
          <ArrowUpOnSquareIcon width={20}/>
          Export File
        </Button>
        <div>
        <input
          type="file"
          className="sr-only"
          id="inputImg"
          onChange={handleFileChange} // ใส่โค้ดการจัดการเมื่อมีการเลือกไฟล์ที่เปลี่ยนแปลงที่นี่
        />
          <label
            htmlFor="inputImg"
            className="cursor-pointer py-3 px-7 rounded-md font-medium text-sm bg-black/[.8] hover:bg-black text-white flex items-center gap-2"
          >
            <ArrowDownOnSquareIcon width={20}/>
            {files ? <span>File Ready</span> : <span>Import File</span>}
          </label>
          </div>            
        </div>
      </div>

      {meterPrevData &&
        meterPrevData.map((label, key) => (
          <div className="px-5 mt-5 border rounded-lg overflow-auto">
            <p className="font-bold my-5">
              {label.dormitoryName} | Building {label.buildingName}
            </p>
            <table className="w-full min-w-max table-auto text-center mb-5 ">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none "
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {label &&
                  label.meterRoomAll &&
                  label.meterRoomAll.map((val, key) => (
                    <tr
                      key={Number(val.roomName)}
                      className="even:bg-blue-gray-50/50"
                    >
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {val.roomName}
                        </Typography>
                      </td>
                      <td className="p-2">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {checkTabsData === "efee"
                            ? val.electricityPrev
                            : val.waterPrev}
                        </Typography>
                      </td>
                      <td className="p-2">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          <input
                            value={
                              inputValues[val.idMeterRoom]?.[
                                checkTabsData === "efee"
                                  ? "electricity"
                                  : "water"
                              ] || ""
                            }
                            onChange={(e) =>
                              handleChangeMeter(
                                val.idMeterRoom,
                                checkTabsData === "efee"
                                  ? "electricity"
                                  : "water",
                                +e.target.value
                              )
                            }
                            className="w-48 h-8 border rounded p-2"
                            placeholder={
                              checkTabsData === "efee"
                                ? val.electricity
                                : val.water
                            }
                          />
                        </Typography>
                      </td>
                      <td className="p-2">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {checkTabsData === "efee"
                            ? val.electricityPrev + val.electricity
                            : val.waterPrev + val.water}
                        </Typography>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      <div className="flex justify-end mt-5">
        <Button
          onClick={() => { files ? sendContractData() : handleSaveMeterData() }}
          className="flex items-center justify-center gap-2 bg-prim hover:bg-prim2 text-a px-8 text-[14px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 32 32"
          >
            <path
              fill="black"
              d="m27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71M12 6h8v4h-8Zm8 20h-8v-8h8Zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26Z"
            />
          </svg>
          Save changes
        </Button>
      </div>
    </div>
  );
}
