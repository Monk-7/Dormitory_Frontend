import {
  PlusCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import DeletePopup from "./Popup/DeletePopup";
import { API } from "../services/configAPI";
import apiClient from "../services/apiClient";

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

interface UserInterface {
  id: string;
  idRoom: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  phonenumber: string;
  token: string;
}

interface updateRoomInterface {
  idRoom: string;
  roomPrice: number;
  furniturePrice: number;
  internetPrice: number;
  parkingPrice: number;
}

export default function TenantDetail({ data }: { data: string }, props: any) {
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const handleOpenDelDialog = () => setOpenDelDialog(!openDelDialog);

  const [openGenCode, setOpenGenCode] = useState(false);
  const handleOpenGenCode = () => setOpenGenCode(!openGenCode);

  const [roomData, setRoomData] = useState<roomInterface>();
  const [userData, setUserData] = useState<UserInterface[]>();
  const [codeRoom, setCodeRoom] = useState<string>("");

  const [form, setForm] = useState<updateRoomInterface>({
    idRoom: "",
    roomPrice: 0,
    furniturePrice: 0,
    internetPrice: 0,
    parkingPrice: 0,
  });

  const getRoom = async () => {
    try {
      const res = await apiClient(`${API}/Room/GetOneRoom/${data}`, {
        method: "GET",
      });
      setRoomData(res.data);
      setForm({
        idRoom: res.data.idRoom,
        roomPrice: res.data.roomPrice,
        furniturePrice: res.data.furniturePrice,
        internetPrice: res.data.internetPrice,
        parkingPrice: res.data.parkingPrice,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await apiClient(`${API}/User/GetUserAllByIdroom/${data}`, {
        method: "GET",
      });
      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCodeRoom = async (idRoom: string) => {
    try {
      const res = await apiClient(`${API}/Room/CreateCode/${idRoom}`, {
        method: "POST",
      });
      setCodeRoom(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeRoomHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleUpdateData = async () => {
    const isFormFilled = Object.values(form).every((value) => value !== "");
    if (isFormFilled) {
      console.log(form);
      try {
        const res = await apiClient(`${API}/Room/UpdateRoom`, {
          method: "PUT",
          data: form,
        });
        console.log(res);

        //window.location.reload();
        getRoom();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  useEffect(() => {
    getRoom();
    getUser();
  }, [data]);

  const check = () => {
    console.log(form);
  };

  const deleteRoom = async () => {
    await apiClient(`${API}/Room/DeleteOneRoom/${data}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="text-sm">
      {/* <button onClick={check}>CHECK</button> */}
      {userData?.length !== 0 ? (
        userData &&
        userData.map((user, index) => (
          <div>
            <Typography variant="h6">Tenant Details</Typography>
            <div className="grid grid-cols-4 items-center mb-4 mt-1">
              <span className="col-span-2">Tenant {index + 1}</span>
              <div className="col-span-2"></div>
            </div>
            <div className="grid grid-cols-4 items-center my-4">
              <span className="text-right pr-5">Name</span>
              <div className="col-span-3">
                <Input
                  label={user.name + " " + user.lastname}
                  color="black"
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center my-4">
              <span className="text-right pr-5">Tel.</span>
              <div className="col-span-3">
                <Input label={user.phonenumber} color="black" disabled />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center my-4">
              <span className="text-right pr-5">E-Mail</span>
              <div className="col-span-3">
                <Input label={user.email} color="black" disabled />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div />
      )}
      <Typography variant="h6" className="py-2">
        Room Details
      </Typography>
      <Typography variant="small">
        Set room default for the first time. You can be edited later.
      </Typography>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Room fee</span>
        <div className="col-span-3">
          <Input
            onChange={changeRoomHandler}
            name="roomPrice"
            type="text"
            placeholder={roomData?.roomPrice.toString()}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Furniture fee</span>
        <div className="col-span-3">
          <Input
            onChange={changeRoomHandler}
            name="furniturePrice"
            type="text"
            placeholder={roomData?.furniturePrice.toString()}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Internet fee</span>
        <div className="col-span-3">
          <Input
            onChange={changeRoomHandler}
            name="internetPrice"
            type="text"
            placeholder={roomData?.internetPrice.toString()}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Parking fee</span>
        <div className="col-span-3">
          <Input
            onChange={changeRoomHandler}
            name="parkingPrice"
            type="text"
            placeholder={roomData?.parkingPrice.toString()}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
      </div>
      <div className="flex mt-5 justify-between">
        <Button
          variant="outlined"
          color="red"
          className="focus:shadow-none"
          onClick={handleOpenDelDialog}
        >
          Delete Room
        </Button>
        <DeletePopup
          open={openDelDialog}
          handler={handleOpenDelDialog}
          del={deleteRoom()}
          name="room"
        />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleOpenGenCode();
              getCodeRoom(roomData?.idRoom);
            }}
            className="bg-black/[.8] hover:bg-black text-white shadow-2 hover:shadow-sm"
          >
            Gen code
          </Button>
          <Dialog size="xs" open={openGenCode} handler={handleOpenGenCode}>
            <DialogBody className="flex flex-col items-center gap-5">
              <Typography variant="h4" color="black">
                Your Code
              </Typography>
              <Typography
                variant="h5"
                color="black"
                className="bg-prim text-a rounded-sm px-5 py-2"
              >
                {codeRoom}
              </Typography>
            </DialogBody>
          </Dialog>
          <Button
            onClick={handleUpdateData}
            className="bg-prim hover:bg-prim2 text-black font-bold bold bold-xl"
          >
            Save
          </Button>
        </div>
      </div>

      <></>
    </div>
  );
}
