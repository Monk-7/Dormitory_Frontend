import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";

import logo from "../img/logo_white1.png";
import { checkLogin, login, registerFunc } from "../services/authService";
import React, { useState, useEffect } from "react";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const loginHandler = async () => {
    const isFormFilled = Object.values(form).every((value) => value !== "");
    console.log(form);
    if (isFormFilled) {
      const res = await login(form);
      console.log(res);
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        alert("เข้าสู่ระบบสำเร็จ");
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
      <Card
        color="transparent"
        shadow={true}
        className="p-10 flex flex-row gap-10"
      >
        <img src={logo} alt="Logo Image" width={350} />
        <div>
          <Typography variant="h4" color="blue-gray" className="text-center">
            Login
          </Typography>
          <form className="mb-2 w-72 mt-10">
            <div>
              <div className="flex flex-col gap-6">
                <Input
                  onChange={changeHandler}
                  name="email"
                  size="lg"
                  label="Email"
                />
                <Input
                  onChange={changeHandler}
                  name="password"
                  type="password"
                  size="lg"
                  label="Password"
                />
              </div>
              <Typography variant="small" className="mt-2 text-right">
                <a href="">Forgot password ?</a>
              </Typography>
            </div>
            <Button onClick={loginHandler} className="mt-6" fullWidth>
              Login
            </Button>
            <Typography
              variant="small"
              color="gray"
              className="mt-4 text-center font-normal"
            >
              Don't have an account ?{" "}
              <a href="/register" className="font-bold text-gray-900">
                Sign Up
              </a>
            </Typography>
          </form>
        </div>
      </Card>
    </div>
  );
}
