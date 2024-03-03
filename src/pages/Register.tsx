import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
  Alert,
} from "@material-tailwind/react";

import { checkLogin, login, registerFunc } from "../services/authService";
import React, { useState, useEffect } from "react";

export function Register() {
  const role = {
    owner: false,

    renter: false,
  };
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
    phonenumber: "",
    role: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const changeHandlerRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (role.owner === true) {
      setForm((prevForm) => ({ ...prevForm, role: "owner" }));
    } else if (role.renter === true) {
      setForm((prevForm) => ({ ...prevForm, role: "renter" }));
    }
  };

  const registerHandler = async () => {
    const isFormFilled = Object.values(form).every((value) => value !== "");
    if (isFormFilled) {
      console.log(form);
      const res = await registerFunc(form);
      if (res.status === 201) {
        const token = res.data.token || "";
        localStorage.setItem("token", token);
        alert("สมัครสมาชิกเสร็จเรียบร้อย");
        window.location.href = "/";
      } else {
        alert(res.response.data.message);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  return (
    <div className="container flex items-center justify-center h-[90vh] mx-auto">
      <Card color="transparent" shadow={true} className="p-10">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <div className="flex items-center">
              Role
              <Radio
                name="type"
                label="Owner"
                className="w-5 h-5"
                onChange={(event) => {
                  role.owner = event.target.checked;
                  changeHandlerRole();
                }}
              />
              <Radio
                name="type"
                label="Renter"
                onChange={(event) => {
                  role.renter = event.target.checked;
                  changeHandlerRole();
                }}
              />
            </div>
            <Input
              name="name"
              size="lg"
              label="Firstname"
              onChange={changeHandler}
            />
            <Input
              name="lastname"
              size="lg"
              label="Lastname"
              onChange={changeHandler}
            />
            <Input
              name="email"
              size="lg"
              label="Email"
              onChange={changeHandler}
            />
            <Input
              name="phonenumber"
              size="lg"
              label="Phone No."
              onChange={changeHandler}
            />
            <Input
              name="password"
              type="password"
              size="lg"
              label="Password"
              onChange={changeHandler}
            />
            <Input
              name="confirmPassword"
              type="password"
              size="lg"
              label="Confirm Password"
              onChange={changeHandler}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button onClick={registerHandler} className="mt-6" fullWidth>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}
