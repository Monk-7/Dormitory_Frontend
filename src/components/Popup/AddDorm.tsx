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

interface dormitoryInterface {
  idUser: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
}

export default function AddDorm(props: any) {
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
      <DialogHeader className="p-2">Create new Dormitory</DialogHeader>
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
      <DialogFooter className="p-2">
        <Button
          variant="filled"
          className="text-a bg-prim hover:bg-prim2"
          onClick={sendDataAddDormitory}
        >
          <span>Continue</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
