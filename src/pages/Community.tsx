import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Input,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import {
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

import apiClient from "../services/apiClient";
import { getUserId } from "../services/userService";

import jsonData from "../jsonTest/Community.json";

const data = [
  {
    imageLink:
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  // {
  //   imageLink:
  //     "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  // },
  // {
  //   imageLink:
  //     "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
  // },
  // {
  //   imageLink:
  //     "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
  // },
  // {
  //   imageLink:
  //     "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
  // },
];

interface communityPostInterface {
  idUser: string;
  category: string;
  title: string;
  details: string;
}

interface communityInterface {
  idCommunity: string;
  idUser: string;
  name: string;
  category: string;
  title: string;
  details: string;
  timesTamp: Date;
}

export default function Community() {
  const [selected, setSelected] = useState(1);
  const setSelectedItem = (value: any) => setSelected(value);
  const [images, setImages] = useState(data);
  const [visibleImages, setVisibleImages] = useState(data);
  const imagesPerPost = 2;

  useEffect(() => {
    const initialVisibleImages = images.slice(0, 2);
    setVisibleImages(initialVisibleImages);
  }, [images]);

  const [form, setForm] = useState<communityPostInterface>({
    idUser: "",
    category: "public",
    title: "public",
    details: "",
  });

  const [postData, setPostData] = useState<communityInterface[]>([]);

  const showMoreImages = () => {
    const remainingImages = images.slice(
      visibleImages.length,
      visibleImages.length + imagesPerPost
    );
    setVisibleImages([...visibleImages, ...remainingImages]);
  };

  const changeCommunityPostHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const sendDataCommunityPost = async () => {
    const isFormFilled = Object.values(form).every((value) => value !== "");
    const token = localStorage.getItem("token");
    if (isFormFilled && token !== "") {
      console.log(form);
      try {
        const res = await apiClient(
          "https://localhost:7282/Api/Community/CreateCommunity",
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

  const getDataPostPublic = async () => {
    const idUser = getUserId();
    if (idUser !== "") {
      try {
        const res = await apiClient(
          `https://localhost:7282/Api/Community/GetPostPublic`,
          {
            method: "GET",
          }
        );
        setPostData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDataPostApartment = async () => {
    const idUser = getUserId();
    if (idUser !== "") {
      try {
        const res = await apiClient(
          `https://localhost:7282/Api/Community/GetPostApartment/${idUser}`,
          {
            method: "GET",
          }
        );
        setPostData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // const idUser = getUserId();
    // if(idUser != '')
    // {
    //   setForm(prevForm => ({ ...prevForm, idUser}));
    // }

    // getDataPostPublic();

    setPostData(jsonData);
  }, []);
  return (
    <div className="mx-5 mt-5 mb-10 min-w-[500px]">
      <Typography variant="h5">Community</Typography>
      <div className="flex md:justify-between justify-center mt-5">
        <Card className="h-fit min-w-[250px] w-[30%] lg:w-[20%] hidden md:block">
          <List className="text-sm">
            <ListItem
              selected={selected === 1}
              // onClick={() => {setSelectedItem(1); getDataPostPublic();}}
            >
              Public
            </ListItem>
            <ListItem
              selected={selected === 2}
              // onClick={() =>{setSelectedItem(2); getDataPostApartment();}}
            >
              My Apartment
            </ListItem>
            <ListItem
              selected={selected === 3}
              //onClick={() => setSelectedItem(3)}
            >
              Announcement
            </ListItem>
          </List>
        </Card>

        <div className="flex flex-col  min-w-[350px] lg:min-w-[450px] md:w-[70%] lg:w-[40%]">
          <Card className="flex flex-row p-4 mx-2 mb-2 gap-2 lg:hidden">
            <img
              className="h-10 w-10 rounded-full object-cover object-center"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />
            <button className="w-full bg-blue-gray-50 rounded-full text-left px-5 text-sm">
              Your Post...
            </button>
          </Card>

          {postData.map((val, key) => (
            <Card className="p-5 mx-2 mb-5">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                  <div className="ml-5">
                    <Typography variant="h6">{val.name}</Typography>
                    <Typography variant="small">2 hours ago</Typography>
                  </div>
                </div>
                <Menu>
                  <MenuHandler>
                    <EllipsisHorizontalIcon className="h-8 w-8 cursor-pointer" />
                  </MenuHandler>
                  <MenuList className="flex flex-col gap-2">
                    <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
                      <div></div>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <div className="mt-5">
                <Typography>{val.details}</Typography>
                <div className="flex gap-2 mt-5">
                  {visibleImages.map((image, index) => (
                    <div key={index} className="">
                      <img
                        className="w-full object-cover object-center"
                        src={image.imageLink}
                        alt="gallery-photo"
                      />
                    </div>
                  ))}
                  {visibleImages.length < images.length && (
                    <button onClick={showMoreImages}>แสดงรูปภาพที่เหลือ</button>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <Typography variant="small">comments</Typography>
              </div>
              <div className="border" />
              <div className="flex mt-5">
                <img
                  className="h-9 w-9 rounded-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
                <div className="ml-5">
                  <Typography variant="small" className="font-bold">
                    The Room52 Apartment
                  </Typography>
                  <Typography variant="small">2 hours ago</Typography>
                </div>
              </div>

              <div className="flex items-center mt-5">
                <img
                  className="h-9 w-9 rounded-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
                <div className="flex ml-5 mr-2 w-full">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
                <IconButton className="min-w-[40px] h-10">
                  <PaperAirplaneIcon className="w-5 h-5" />
                </IconButton>
              </div>
            </Card>
          ))}
        </div>
        <Card className="p-5 h-fit min-w-[300px] w-[20%] hidden lg:block">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover object-center"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />
            <div className="ml-5">
              <Typography variant="h6">The Room52 Apartment</Typography>
            </div>
          </div>
          <div>
            <Textarea
              onChange={changeCommunityPostHandler}
              name="details"
              variant="static"
              placeholder="Your Post"
              rows={8}
            />
            <div className="flex w-full justify-between py-1.5">
              <div className="flex items-center gap-2">
                <IconButton variant="text" color="blue-gray">
                  <PhotoIcon className="w-8 h-8" />
                </IconButton>
                <IconButton variant="text" color="blue-gray">
                  <MapPinIcon className="w-8 h-8" />
                </IconButton>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={sendDataCommunityPost}
                  size="md"
                  className="rounded-md"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
