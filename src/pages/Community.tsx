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
import JSZip from "jszip";
import PostCommunity from "../components/PostCommunity";
import AddPostCommunity from "../components/AddPostCommunity";
import { API } from "../services/configAPI";

const data = [
  {
    imageLink:
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];


interface communityIdInterface {
  idCommunity: string;
  idUser: string;
}


export default function Community() {
  const [selected, setselected] = useState(1);
  const [categoryPost, setCategoryPost] = useState('public');
  const [postData, setPostData] = useState<string[]>([]);

  const getDataPostPublic = async () => {
    try {
      const res = await apiClient(
        `${API}/Community/GetPostPublic`,
        {
          method: "GET",
        }
      );
      setPostData(res.data)
      setCategoryPost('public');
      console.log(res.data);
    }
    catch (error) {
      console.log(error);
    }
    
  };

  const getDataPostApartment = async () => {
    const idUser = getUserId();
    if (idUser !== "") {
      try {
        const res = await apiClient(
          `${API}/Community/GetPostApartment/${idUser}`,
          {
            method: "GET",
          }
        );
        setPostData(res.data);
        setCategoryPost('apartment');
        //console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDataPostAnnouncement = () => {
    // const idUser = getUserId();
    // if (idUser !== "") {
    //   try {
    //     const res = await apiClient(
    //       `${API}/Community/GetPostApartment/${idUser}`,
    //       {
    //         method: "GET",
    //       }
    //     );
    //     setPostData(res.data);
    //     setCategoryPost('apartment');
    //     //console.log(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    setPostData([]);
  };

  useEffect(() => {
    getDataPostPublic();
  }, []);
  return (
    <div className="mx-5 mt-5 mb-10 min-w-[500px]">

      <Typography variant="h5">Community</Typography>
      <div className="flex md:justify-between justify-center mt-5">
        <Card className="h-fit min-w-[250px] w-[30%] lg:w-[20%] hidden md:block">
          <List className="text-sm">
            <ListItem
              selected={selected === 1}
              onClick={() => {setselected(1); getDataPostPublic();}}
            >
              Public
            </ListItem>
            <ListItem
              selected={selected === 2}
              onClick={() =>{setselected(2); getDataPostApartment();}}
            >
              My Apartment
            </ListItem>
            <ListItem
              selected={selected === 3}
              onClick={() => {setselected(3); getDataPostAnnouncement();}}
            >
              Announcement
            </ListItem>
          </List>
        </Card>

        <div className="flex flex-col  min-w-[350px] lg:min-w-[450px] md:w-[80%] lg:w-[50%]">
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
            <PostCommunity data = {val}/>
          ))}
        </div>
        <AddPostCommunity data = {categoryPost}/>
      </div>
    </div>
  );
}
