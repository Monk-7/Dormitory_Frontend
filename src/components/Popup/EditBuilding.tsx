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
import DeletePopup from "./DeletePopup";

interface buildingDetailInterface {
  buildingName: string;
  waterPrice: number;
  electricalPrice: number;
}

export default function EditBuilding(props: any) {

  const [form, setForm] = useState<buildingDetailInterface>({
    buildingName : '',
    waterPrice : 0,
    electricalPrice : 0
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form, [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const getData = async () => {
    try {
      const res = await apiClient(`${API}/Building/GetBuildingDetail/${props.id}`, {
        method: "GET",
      });
      setForm(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendData = async () => {
    const isFormFilled = Object.values(form).every((value) => value !== "");
    if (isFormFilled) {
      console.log(form);
      try {
        const res = await apiClient(`${API}/Building/EdotBuildingDetail/${props.id}`, {
          method: "PUT",
          data: form,
        });
        console.log(res);
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  const deleteBuilding = async () => {
    await apiClient(`${API}/Building/DeleteBuilding/${props.id}`, {
      method: "DELETE",
    });
    props.rerender(true);
  };

  const [openDelDialog, setOpenDelDialog] = useState(false);
  const handleOpenDelDialog = () => setOpenDelDialog(!openDelDialog);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Dialog
      size="xs"
      className="p-4 md:!min-w-[600px]"
      open={props.open}
      handler={props.handler}
    >
      <DialogHeader className="p-2">Edit building</DialogHeader>
      <DialogBody className="p-2">
        <p>You can edit your building information.</p>
        <div className="my-6 flex items-center gap-5">
          <p className="w-[200px] text-black text-right">Building name</p>
          <Input
            onChange={changeHandler}
            name="buildingName"
            label="Building name"
            value={form.buildingName}
          />
        </div>
        {/* <div className="my-6 flex items-center gap-5">
          <p className="w-[200px] text-black text-right">Number of floors</p>
          <Input
            disabled
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
            disabled
            onChange={changeRoomHandler}
            name="numberofRoom"
            label="Number of Rooms / Floor"
          />
        </div> */}
      </DialogBody>
      <DialogHeader className="p-2">Room details</DialogHeader>
      <DialogBody className="p-2">
        <p>You can edit your room information.</p>

        {/* <div className="my-6 flex items-center gap-5">
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
        </div> */}
        <div className="my-6 flex items-center gap-5">
          <p className="w-[200px] text-black text-right">Electric Fee</p>
          <Input
            onChange={changeHandler}
            name="electricalPrice"
            label="Electric Fee"
            value={form.electricalPrice}

          />
        </div>
        <div className="my-6 flex items-center gap-5">
          <p className="w-[200px] text-black text-right">Water Fee</p>
          <Input
            onChange={changeHandler}
            name="waterPrice"
            label="Water Fee"
            value={form.waterPrice}
          />
        </div>
      </DialogBody>
      <DialogFooter className="p-2 gap-2">
        <Button
          variant="outlined"
          color="red"
          className="focus:shadow-none"
          onClick={handleOpenDelDialog}
        >
          Delete Building
        </Button>
        <DeletePopup
          open={openDelDialog}
          handler={handleOpenDelDialog}
          del={deleteBuilding}
          name="Building"
        />
        <Button
          variant="filled"
          className="bg-black"
          onClick={sendData}
        >
          <span>Continue</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
