import {
  Button,
  Card,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import configAPI, { API } from "../services/configAPI";
import apiClient from "../services/apiClient";

import {
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import JSZip from "jszip";
import Comment from "./Comment";
import { getUserId } from "../services/userService";

const img = [
  {
    imageLink:
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

interface getPostInterface {
  idCommunity: string;
  idUser: string;
  fullName: string;
  category: string;
  details: string;
  timesTamp: string;
}
interface postInterface {
  idCommunity: string;
  idUser: string;
  fullName: string;
  category: string;
  details: string;
  timesTamp: Date;
}

interface getCommentInterface {
  idComment: string;
  idCommunity: string;
  idUser: string;
  fullName: string;
  category: string;
  details: string;
  timesTamp: string;
}

export default function PostCommunity({ data }: { data: string }) {
  const [visibleImages, setVisibleImages] = useState(img);
  const [images, setImages] = useState(img);
  const imagesPerPost = 2;

  const [postData, setPostData] = useState<postInterface>();
  const [timePost, setTimePost] = useState<string>();
  const [imageUrl, setImageUrl] = useState([]);
  const [proFileUrlPost, setProFileUrlPost] = useState<string>();
  const [proFileUrl, setProFileUrl] = useState<string>();

  const [commentData, setCommentData] = useState<getCommentInterface[]>([]);
  const [formComment, setFormComment] = useState<string>();

  const showMoreImages = () => {
    const remainingImages = images.slice(
      visibleImages.length,
      visibleImages.length + imagesPerPost
    );
    setVisibleImages([...visibleImages, ...remainingImages]);
  };

  const setDate = (_data: getPostInterface) => {
    const newData: postInterface = {
      ..._data,
      timesTamp: new Date(_data.timesTamp), // แปลง timesTamp เป็น Date
    };

    return newData;
  };

  const formatTimeAgo = (postTimestamp: Date): string => {
    const currentTimestamp = new Date();
    const timeDiff = currentTimestamp.getTime() - postTimestamp.getTime();

    // คำนวณเวลาในหน่วยต่าง ๆ
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.4375)); // ประมาณหนึ่งเดือนมีประมาณ 30.4375 วัน
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25)); // ประมาณหนึ่งปีมีประมาณ 365.25 วัน

    // สร้างข้อความเพื่อแสดงผล
    if (years > 0) {
      return `${years} years ago`;
    } else if (months > 0) {
      return `${months} months ago`;
    } else if (weeks > 0) {
      return `${weeks} weeks ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else {
      return `${minutes} minutes ago`;
    }
  };

  const handleZipFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const buffer = reader.result;
      const zip = new JSZip();
      const zipFile = await zip.loadAsync(buffer);
      const imageUrls = [];

      // เปลี่ยน forEach เป็น for-of เพื่อให้สามารถใช้ await ได้ในการทำงานกับ zipEntry
      for (const [relativePath, zipEntry] of Object.entries(zipFile.files)) {
        //console.log('File:', relativePath);
        const imageData = await zipEntry.async("arraybuffer");
        const blob = new Blob([imageData]);
        const imageUrl = URL.createObjectURL(blob);
        imageUrls.push(imageUrl);
      }

      setImageUrl(imageUrls);
    };

    reader.readAsArrayBuffer(file);
  };

  const getImgPost = async () => {
    try {
      const res = await apiClient(`${API}/Community/images/${data}`, {
        responseType: "blob",
        method: "GET",
      });
      await handleZipFile(res.data);
      //console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getImgProFile = async (idUser: string) => {
    try {
      const res = await apiClient(`${API}/User/getProFile/${idUser}`, {
        responseType: "blob",
        method: "GET",
      });

      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      setProFileUrlPost(url);
    } catch (error) {
      console.log(error);
      setProFileUrlPost(
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      );
    }
  };

  const getPost = async () => {
    try {
      const res = await apiClient(`${API}/Community/GetPost/${data}`, {
        method: "GET",
      });
      const postWithDateConverted = setDate(res.data);
      setPostData(postWithDateConverted);
      setTimePost(formatTimeAgo(postWithDateConverted.timesTamp));
      await getImgPost();
      await getImgProFile(res.data.idUser);
      //console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = async () => {
    try {
      const res = await apiClient(`${API}/Comment/GetAllComment/${data}`, {
        method: "GET",
      });
      setCommentData(res.data);
      setFormComment("");
      //console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      const idUser = getUserId();
      const form = {
        idCommunity: data,
        idUser: idUser,
        details: formComment,
      };
      const res = await apiClient(`${API}/Comment/CreateComment`, {
        method: "POST",
        data: form,
      });
      getComment();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
    getComment();
    const url = localStorage.getItem("ProFileURL") || "";
    setProFileUrl(url);
  }, [data]);

  return (
    <Card className="p-5 mx-2 mb-5">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover object-center"
            src={proFileUrlPost}
            alt="nature image"
          />
          <div className="ml-5">
            <Typography variant="h6">{postData?.fullName}</Typography>
            <Typography variant="small"> {timePost}</Typography>
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
        <Typography>{postData?.details}</Typography>
        <div className="flex gap-2 mt-5">
          {imageUrl.map((image, index) => (
            <div key={index} className="">
              <img
                className="w-full object-cover object-center"
                src={image}
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
      {commentData && commentData.map((comment) => <Comment data={comment} />)}

      <div className="flex items-center mt-5">
        <img
          className="h-9 w-9 rounded-full object-cover object-center"
          src={proFileUrl}
          alt="nature image"
        />
        <div className="flex ml-5 mr-2 w-full">
          <Input
            onChange={(event) => {
              setFormComment(event.currentTarget.value);
            }}
            value={formComment}
            type="text"
            placeholder="Comment..."
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
          />
        </div>
        <IconButton
          onClick={postComment}
          className="min-w-[40px] h-10 bg-prim hover:bg-prim2"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </IconButton>
      </div>
    </Card>
  );
}
