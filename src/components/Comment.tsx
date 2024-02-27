import { Carousel, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { API } from "../services/configAPI";
import apiClient from "../services/apiClient";

interface getCommentInterface {

  idComment:string;
  idCommunity:string;
  idUser: string;
  fullName: string;
  category: string;
  details: string;
  timesTamp: string;
}
interface commentInterface {

  idComment:string;
  idCommunity:string;
  idUser: string;
  fullName: string;
  category: string;
  details: string;
  timesTamp : Date;
}
export default function Comment({data}:{data:getCommentInterface}) {

  const [commentData, setCommentData] = useState<commentInterface>();
  const [proFileUrl, setProFileUrl] = useState<string>();
  const [timePost, setTimePost] = useState<string>();

  const setDate = (_data: getCommentInterface) => {
    const newData: commentInterface = {
      ..._data,
      timesTamp: new Date(_data.timesTamp) // แปลง timesTamp เป็น Date
    };
  
    return newData;
  }

  const formatTimeAgo = (postTimestamp: Date): string => {
    const currentTimestamp = new Date();
    const timeDiff = currentTimestamp.getTime() - postTimestamp;
  
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
  }

  const getImgProFile = async (idUser : string) =>
  {
    try{
      const res = await apiClient(`${API}/User/getProFile/${idUser}`, {
        responseType: 'blob',
        method: 'GET'
      });
      
      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      setProFileUrl(url);
    }
    catch(error)
    {
      console.log(error);
      setProFileUrl("https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80");
    }
  }

  useEffect(()=>{
    setCommentData(setDate(data));
    getImgProFile(data.idUser);
  },[data])

  return (
    <div className="flex mt-5">
      <img
        className="h-9 w-9 rounded-full object-cover object-center"
        src={proFileUrl}
        alt="nature image"
      />
      <div className="ml-5">
        <Typography variant="small" className="font-bold">
          {commentData?.fullName}
        </Typography>
        {commentData?.details}
        <Typography variant="small">{formatTimeAgo(commentData?.timesTamp.getTime())}</Typography>
      </div>
    </div>
  );
}
