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
import configAPI from "../../services/configAPI.json";


interface roomInterface {
  idBuilding: string;
  roomName: string;
}

export default function AddRoom({ data }: { data: string }) {
  const { status: isOpen, toggleStatus: setIsOpen } = useToggle();

  const [form, setForm] = useState<roomInterface>({
    idBuilding: "",
    roomName: "",
  });

  const changeBuildingHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const sendDataAddBuilding = async () => {
    const isFormFilled = Object.values(form).every((value) => value !== "");
    if (isFormFilled) {
      console.log(form);
      try {
        const res = await apiClient(
          `${configAPI.api_url.localHost}/Room/CreateOneRoom`,
          {
            method: "POST",
            data: form,
          }
        );
        console.log(res);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  useEffect(() => {
    setForm(prevForm => ({ ...prevForm, idBuilding : data}));
  }, []);

  return (
    <div>
      <PlusCircleIcon
        width={26}
        onClick={setIsOpen}
        className="cursor-pointer"
      />
      <Dialog size="sm" open={isOpen} handler={setIsOpen} className="p-4 ">
        <DialogHeader className="p-2">Create new room</DialogHeader>
        <DialogBody className="p-2">
          <p>You need to enter the detail for create your room.</p>
          <div className="my-6 flex items-center gap-5">
            <p className="w-[200px] text-black text-right">Room name</p>
            <Input
              onChange={changeBuildingHandler}
              name="roomName"
              label="Room name"
            />
          </div>
        </DialogBody>
        <DialogFooter className="p-2">
          <Button variant="filled" className="bg-black" onClick={setIsOpen}>
            <span onClick={sendDataAddBuilding}>Continue</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
