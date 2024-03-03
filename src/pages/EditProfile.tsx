import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Avatar,
  Button,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import {
  IdentificationIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

export default function EditProfile() {
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
  return (
    <div className="container flex justify-center gap-10 mt-[3%] mx-[auto] w-full h-full ">
      <Card color="transparent" shadow={true} className="p-10 w-[60%] h-[60%]">
        <Typography variant="h4" color="blue-gray">
          Profile picture
        </Typography>
        <hr className="my-5 border-tao" />
        <Typography
          color="gray"
          className="mt-4 font-normal flex  justify-center w-full "
        >
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="border border-gray-900  p-0.5 w-[50%] h-full "
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </Typography>
        <Typography
          color="gray"
          className="mt-8 font-normal flex  justify-center"
        >
          Upload your new profile PNG or JPG.
        </Typography>
        <Button className="mt-6 text-a bg-prim hover:bg-prim2" fullWidth>
          Upload new profile
        </Button>
        <Typography
          color="gray"
          className="mt-8 font-normal text-tao2 flex justify-start  "
        >
          <BuildingOffice2Icon className="w-[6%] mr-2 flex items-end"></BuildingOffice2Icon>
          Join application at 2/2/2024.
        </Typography>
      </Card>

      <Card color="transparent" shadow={true} className="p-10 w-full ">
        <Typography variant="h4" color="blue-gray">
          My profile
        </Typography>
        <hr className="my-5 border-tao" />
        <form className="my-2 w-full  ">
          <div className="mb-4 flex flex-col gap-6  w-auto">
            <div className="flex gap-6">
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
            </div>
            <div className="flex gap-6">
              <Input
                name="Nickname"
                size="lg"
                label="Nickname"
                onChange={changeHandler}
              />
              <Input
                name="Birthday"
                size="lg"
                label="Birthday"
                onChange={changeHandler}
              />
            </div>
            <div className="flex gap-6">
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
            </div>
            <Input
              name="Address"
              type="address"
              size="lg"
              label="Address"
              onChange={changeHandler}
            />
            <Typography className="mt-3 font-bold text-e flex justify-start">
              Change your password.
            </Typography>
            <div className="flex items-center ">
              <div className="flex w-[50%]  mr-6">
                <Input
                  name="password"
                  type="password"
                  size="lg"
                  label="Password"
                  onChange={changeHandler}
                />
              </div>
              <Typography className="text-sm text-blue-gray-400">
                * Your password must be at least 6 characters long.
              </Typography>
            </div>
            <div className="w-[50%] flex flex-col gap-6">
              <Input
                name="confirmPassword"
                type="password"
                size="lg"
                label="Confirm Password"
                onChange={changeHandler}
              />
            </div>
            <div className="mt-6 flex justify-between gap-6">
              <Button className=" text-e  bg-tao hover:bg-tao2 w-[50%] ">
                Cancel
              </Button>
              <Button className=" text-a bg-prim hover:bg-prim2 w-[50%] ">
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
