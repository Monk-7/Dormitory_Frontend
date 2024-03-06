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
import apiClient from "../services/apiClient";
import { API } from "../services/configAPI";
import { getUserId } from "../services/userService";

export default function EditProfile() {

  const [proFileUrl, setProFileUrl] = useState<string>();
  const [files, setFiles] = useState();
  const [form, setForm] = useState({
    idUser: "",
    email: "",
    name: "",
    lastname: "",
    phonenumber: "",
    password: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      setFiles(file);
      const blob = new Blob([file], { type: "image/" });
      const url = URL.createObjectURL(blob);
      setProFileUrl(url);
    } else {
      alert("Image File only");
      setFiles(undefined);
    }
  };

  const sendImgData = async () => {
    const formData = new FormData();
    formData.append(`file`, files);
    try {
      const idUser = getUserId()
      const res = await apiClient(`${API}/User/UpdateImg/${idUser}`, {
        method: "PUT",
        data: formData,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getImgProFile = async () => {
    try {
      const idUser = getUserId()
      const res = await apiClient(`${API}/User/getProFile/${idUser}`, {
        responseType: "blob",
        method: "GET",
      });

      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      setProFileUrl(url);
      localStorage.setItem("ProFileURL", url);
    } catch (error) {
      console.log(error);
      setProFileUrl(
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      );
      localStorage.setItem(
        "ProFileURL",
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      );
    }
  };

  const getUser = async () => {
    try {
      const idUser = getUserId()
      const res = await apiClient(`${API}/User/GetUser/${idUser}`, {
        method: "GET",
      });
      setForm({
        ...form,
        idUser : res.data.id,
        email: res.data.email,
        name: res.data.name,
        lastname: res.data.lastname,
        phonenumber: res.data.phonenumber
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserData = async () => {
    const isFormFilled = Object.values(form).every((value) => value !== "");
    if (isFormFilled) {
      console.log(form);
      try {
        if(files !== undefined) await sendImgData();
        const res = await apiClient(`${API}/User/EditProfile`, {
          method: "PUT",
          data: form,
        });
        console.log(res);
        localStorage.setItem('token', res.data);
        
        alert("Update successfu");
        window.location.reload();
      } catch (error) {
        alert(error.response.data.message);
        console.log(error);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  useEffect(() =>{
    getImgProFile();
    getUser();
  },[])

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
            className="border border-gray-900  p-0.5 w-[50%] h-[50%] "
            src={proFileUrl}
          />
        </Typography>
        <Typography
          color="gray"
          className="mt-8 font-normal flex  justify-center"
        >
          
          Upload your new profile PNG or JPG.
        </Typography>
        
        <label
          className="mt-6 text-a bg-prim hover:bg-prim2 cursor-pointer py-2 px-4 rounded-md font-medium text-sm flex items-center justify-center"
          htmlFor="inputImg"
        >
          <input
            type="file"
            className="sr-only"
            id="inputImg"
            onChange={handleFileChange}
          />
          Upload new profile
        </label>
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
                value={form.name}
                onChange={changeHandler}
              />
              <Input
                name="lastname"
                size="lg"
                label="Lastname"
                value={form.lastname}
                onChange={changeHandler}
              />
            </div>
            {/* <div className="flex gap-6">
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
            </div> */}
            <div className="flex gap-6">
              <Input
                name="email"
                size="lg"
                label="Email"
                value={form.email}
                onChange={changeHandler}
              />
              <Input
                name="phonenumber"
                size="lg"
                label="Phone No."
                value={form.phonenumber}
                onChange={changeHandler}
              />
            </div>
            <Input
              name="password"
              type="password"
              size="lg"
              label="Password"
              onChange={changeHandler}
            />
            {/* <Typography className="mt-3 font-bold text-e flex justify-start">
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
            </div> */}
            <div className="mt-6 flex justify-between gap-6">
              <Button className=" text-e  bg-tao hover:bg-tao2 w-[50%] ">
                Cancel
              </Button>
              <Button onClick={updateUserData} className=" text-a bg-prim hover:bg-prim2 w-[50%] ">
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
