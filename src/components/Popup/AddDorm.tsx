import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useToggle } from "../../hooks/useToggle";

interface buildingInterface {
  idUser: string;
  buildingName: string;
  buildingRoomNumberlength: number;
  buildingFloor: number;
  buildingRoom: number;
  waterPrice: number;
  electricalPrice: number;
  roomPrice: number;
  furniturePrice: number;
  internetPrice: number;
  parkingPrice: number;
}

export default function AddDorm() {
  const { status: isOpen, toggleStatus: setIsOpen } = useToggle();

  const [form, setForm] = useState<buildingInterface>({
    idUser: "",
    buildingName: "",
    buildingRoomNumberlength: 3,
    buildingFloor: 0,
    buildingRoom: 0,
    waterPrice: 0,
    electricalPrice: 0,
    roomPrice: 0,
    furniturePrice: 0,
    internetPrice: 0,
    parkingPrice: 0,
  });

  const changeDormitoryHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div>
      <button className="flex relative items-center" onClick={setIsOpen}>
        <BuildingOffice2Icon width={24} />
        <PlusCircleIcon
          width={20}
          className="absolute right-[-5px] top-[-7px]"
        />
      </button>
      <Dialog size="sm" open={isOpen} handler={setIsOpen} className="p-4 ">
        <DialogHeader className="p-2">Create new building</DialogHeader>
        <DialogBody className="p-2">
          <p>You need to enter the detail for create your dormitory.</p>
          <div className="my-5 flex items-center gap-5">
            <p className="w-[150px] text-black text-right">Dormitory name</p>
            <Input
              onChange={changeDormitoryHandler}
              name="dormitoryName"
              label="Dormitory name"
            />
          </div>
          <div className="my-5 flex items-center gap-5">
            <p className="w-[150px] text-black text-right">Address</p>
            <Input
              onChange={changeDormitoryHandler}
              name="address"
              label="Address"
            />
          </div>
          <div className="my-5 flex items-center gap-5">
            <p className="w-[150px] text-black text-right">District</p>
            <Input
              onChange={changeDormitoryHandler}
              name="district"
              label="District"
            />
          </div>
          <div className="my-5 flex items-center gap-5">
            <p className="w-[150px] text-black text-right">Province</p>
            <Input
              onChange={changeDormitoryHandler}
              name="province"
              label="Province"
            />
          </div>
          <div className="my-5 flex items-center gap-5">
            <p className="w-[150px] text-black text-right">Postal Code</p>
            <Input
              onChange={changeDormitoryHandler}
              name="postalCode"
              label="Postal Code"
            />
          </div>
        </DialogBody>
        <DialogHeader className="p-2">Contact</DialogHeader>
        <DialogBody className="p-2">
          <p></p>

          <div className="my-5 flex items-center gap-5">
            <p className="w-[150px] text-black text-right">E-mail</p>
            <Input
              onChange={changeDormitoryHandler}
              name="eMail"
              label="E-mail"
            />
          </div>
          <div className="my-5 flex items-center gap-5">
            <p className="w-[150px] text-black text-right">Phone No.</p>
            <Input
              onChange={changeDormitoryHandler}
              name="phoneNumber"
              label="Phone No."
            />
          </div>
        </DialogBody>
        <DialogFooter className="p-2">
          <Button variant="filled" className="bg-black" onClick={setIsOpen}>
            <span>Continue</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
