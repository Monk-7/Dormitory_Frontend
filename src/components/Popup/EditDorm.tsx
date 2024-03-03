import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import apiClient from "../../services/apiClient";
import { API } from "../../services/configAPI";
import { getUserId } from "../../services/userService";
import DeletePopup from "./DeletePopup";

interface dormitoryInterface {
  idUser: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
}

export default function EditDorm(props: any) {
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const handleOpenDelDialog = () => setOpenDelDialog(!openDelDialog);
  const [form, setForm] = useState<dormitoryInterface>({
    idUser: "",
    address: "",
    district: "",
    province: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
  });

  const changeDormitoryHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const sendDataAddDormitory = async () => {
    const isFormFilled = Object.values(form).every((value) => value !== "");
    if (isFormFilled) {
      console.log(form);
      try {
        const res = await apiClient(`${API}/Dormitory/CreateDormitory`, {
          method: "POST",
          data: form,
        });
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
    const idUser = getUserId();
    if (idUser != "") {
      setForm((prevForm) => ({ ...prevForm, idUser }));
    }
  }, []);

  return (
    <Dialog
      size="xs"
      className="p-4 md:!min-w-[600px]"
      open={props.open}
      handler={props.handler}
    >
      <DialogHeader className="p-2">Edit dormitory</DialogHeader>
      <DialogBody className="p-2">
        <p>You can edit your dormitory information.</p>
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
            disabled
            onChange={changeDormitoryHandler}
            name="address"
            label="Address"
          />
        </div>
        <div className="my-5 flex items-center gap-5">
          <p className="w-[150px] text-black text-right">District</p>
          <Input
            disabled
            onChange={changeDormitoryHandler}
            name="district"
            label="District"
          />
        </div>
        <div className="my-5 flex items-center gap-5">
          <p className="w-[150px] text-black text-right">Province</p>
          <Input
            disabled
            onChange={changeDormitoryHandler}
            name="province"
            label="Province"
          />
        </div>
        <div className="my-5 flex items-center gap-5">
          <p className="w-[150px] text-black text-right">Postal Code</p>
          <Input
            disabled
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
            name="email"
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
      <DialogFooter className="gap-2 p-2">
        <Button
          variant="outlined"
          color="red"
          className="focus:shadow-none"
          onClick={handleOpenDelDialog}
        >
          Delete Dorm
        </Button>
        <DeletePopup open={openDelDialog} handleDialog={handleOpenDelDialog} />
        <Button
          variant="filled"
          className="bg-black"
          onClick={sendDataAddDormitory}
        >
          <span>save</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
