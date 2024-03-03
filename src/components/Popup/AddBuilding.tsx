import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useToggle } from "../../hooks/useToggle";
import React, { useState, useEffect } from "react";

import apiClient from "../../services/apiClient";
import { API } from "../../services/configAPI";

interface buildingInterface {
  idDormitory: string;
  buildingName: string;
  waterPrice: number;
  electricalPrice: number;
}

interface roomInterface {
  roomNumberlength: number;
  numberofFloor: number;
  numberofRoom: number;
  roomPrice: number;
  furniturePrice: number;
  internetPrice: number;
  parkingPrice: number;
}

export default function AddBuilding({ data }: { data: string }) {
  const { status: isOpen, toggleStatus: setIsOpen } = useToggle();

  const [formBuilding, setFormBuilding] = useState<buildingInterface>({
    idDormitory: "",
    buildingName: "",
    waterPrice: 0,
    electricalPrice: 0,
  });

  const [formRoom, setFormRoom] = useState<roomInterface>({
    roomNumberlength: 3,
    numberofFloor: 0,
    numberofRoom: 0,
    roomPrice: 0,
    furniturePrice: 0,
    internetPrice: 0,
    parkingPrice: 0,
  });

  const changeBuildingHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormBuilding({
      ...formBuilding,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const changeRoomHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormRoom({
      ...formRoom,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const sendDataAddBuildingAndRoom = async () => {
    const isFormFilledBuilding = Object.values(formBuilding).every(
      (value) => value !== ""
    );
    const isFormFilledRoom = Object.values(formRoom).every(
      (value) => value !== ""
    );
    if (isFormFilledBuilding && isFormFilledRoom) {
      console.log(formBuilding);
      try {
        const resBuilding = await apiClient(`${API}/Building/CreateBuilding`, {
          method: "POST",
          data: formBuilding,
        });
        const _formRoom = {
          idBuilding: resBuilding.data,
          roomNumberlength: formRoom.roomNumberlength,
          numberofFloor: formRoom.numberofFloor,
          numberofRoom: formRoom.numberofRoom,
          roomPrice: formRoom.roomPrice,
          furniturePrice: formRoom.furniturePrice,
          internetPrice: 0,
          parkingPrice: 0,
        };
        try {
          const resRoom = await apiClient(`${API}/Room/CreateRoom`, {
            method: "POST",
            data: _formRoom,
          });
          console.log(resRoom);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  useEffect(() => {
    setFormBuilding((prevForm) => ({ ...prevForm, idDormitory: data }));
  }, []);

  return (
    <div>
      <PlusCircleIcon
        width={26}
        onClick={setIsOpen}
        className="cursor-pointer"
      />
      <Dialog
        size="xs"
        className="p-4 md:!min-w-[600px]"
        open={isOpen}
        handler={setIsOpen}
      >
        <DialogHeader className="p-2">Create new building</DialogHeader>
        <DialogBody className="p-2">
          <p>You need to enter the detail for create your building.</p>
          <div className="my-6 flex items-center gap-5">
            <p className="w-[200px] text-black text-right">Building name</p>
            <Input
              onChange={changeBuildingHandler}
              name="buildingName"
              label="Building name"
            />
          </div>
          <div className="my-6 flex items-center gap-5">
            <p className="w-[200px] text-black text-right">Number of floors</p>
            <Input
              onChange={changeRoomHandler}
              name="numberofFloor"
              label="Number of floors"
            />
          </div>
          <div className="my-6 flex items-center gap-5">
            <p className="w-[200px] text-black text-right">
              Number of Rooms / Floor
            </p>
            <Input
              onChange={changeRoomHandler}
              name="numberofRoom"
              label="Number of Rooms / Floor"
            />
          </div>
        </DialogBody>
        <DialogHeader className="p-2">Room details</DialogHeader>
        <DialogBody className="p-2">
          <p>Set room default for the fist time. You can be edited later.</p>

          <div className="my-6 flex items-center gap-5">
            <p className="w-[200px] text-black text-right">Room Price</p>
            <Input
              onChange={changeRoomHandler}
              name="roomPrice"
              label="Room Price"
            />
          </div>
          <div className="my-6 flex items-center gap-5">
            <p className="w-[200px] text-black text-right">Furniture Price</p>
            <Input
              onChange={changeRoomHandler}
              name="furniturePrice"
              label="Furniture Price"
            />
          </div>
          <div className="my-6 flex items-center gap-5">
            <p className="w-[200px] text-black text-right">Electric Fee</p>
            <Input
              onChange={changeBuildingHandler}
              name="electricalPrice"
              label="Electric Fee"
            />
          </div>
          <div className="my-6 flex items-center gap-5">
            <p className="w-[200px] text-black text-right">Water Fee</p>
            <Input
              onChange={changeBuildingHandler}
              name="waterPrice"
              label="Water Fee"
            />
          </div>
        </DialogBody>
        <DialogFooter className="p-2">
          <Button
            variant="filled"
            className="bg-black"
            onClick={sendDataAddBuildingAndRoom}
          >
            <span>Continue</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
