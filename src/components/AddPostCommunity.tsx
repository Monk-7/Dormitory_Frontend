import { MapPinIcon, PhotoIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  Carousel,
  IconButton,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import apiClient from "../services/apiClient";
import { useEffect, useState } from "react";
import { API } from "../services/configAPI";
import { getCurrentUser, getUserId } from "../services/userService";

interface communityPostInterface {
  idUser: string;
  category: string;
  details: string;
}
interface userInterface {
  userID: string;
  firstname: string;
  lastname: string;
  role: string;
}
export default function AddPostCommunity({ data }: { data: string }) {
  const [imageFormFiles, setImageFormFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [proFileUrl, setProFileUrl] = useState<string>();
  const [userData, setUserData] = useState<userInterface>();
  const [form, setForm] = useState<communityPostInterface>({
    idUser: "",
    category: "public",
    details: "",
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    const imageFilesArray = [];
    const imageFilesUrl = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        alert("Png or Jpg File Only");
        imageFilesArray.length = 0;
        break;
      }
      const url = URL.createObjectURL(file);
      imageFilesUrl.push(url);
      imageFilesArray.push(file);
    }
    setImageUrl(imageFilesUrl);
    setImageFormFiles(imageFilesArray);
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
        const res = await apiClient(`${API}/Community/CreatePost`, {
          method: "POST",
          data: form,
        });
        const formData = new FormData();
        imageFormFiles.forEach((file) => {
          formData.append(`files`, file);
        });
        if(form.category == "announcement")
        {
          try {
            const idUser = getUserId();
            const formA = {
              idUser : idUser,
              details : form.details
            }
            const res = await apiClient(
              `${API}/Notify/CreateNotifyAnnouncement`,
              {
                method: "Post",
                data : formA
              }
            );
            
          } catch (error) {
            console.log(error);
          }
        }
        try {
          const resImg = await apiClient(
            `${API}/Community/updatePost/${res.data}`,
            {
              method: "PUT",
              data: formData,
            }
          );
          
          // console.log(resImg);
        } catch (error) {
          console.log(error);
        }
        
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  useEffect(() => {
    const url = localStorage.getItem("ProFileURL") || "";
    setProFileUrl(url);
    const user = getCurrentUser();
    setUserData(user);

    setForm((prevForm) => ({ ...prevForm, category: data }));
    setForm((prevForm) => ({ ...prevForm, idUser: user.userID }));
  }, [data]);

  return (
    <Card className="p-5 h-fit min-w-[300px] max-w-[400px] w-[30%] hidden lg:block">
      <div className="flex items-center">
        <img
          className="h-10 w-10 rounded-full object-cover object-center"
          src={proFileUrl}
          alt="nature image"
        />
        <div className="ml-5">
          <Typography variant="h6">
            {userData?.firstname + " " + userData?.lastname}
          </Typography>
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

        {imageUrl &&
          imageUrl.map((img, index) => (
            <div key={index} className="">
              <img
                className="w-full object-cover object-center"
                src={img}
                alt="gallery-photo"
              />
            </div>
          ))}
        <div className="flex w-full justify-between py-1.5">
          <div className="flex items-center gap-2">
            <IconButton variant="text" className="hover:bg-tao text-e-300">
              <input
                type="file"
                className="sr-only"
                id="inputImg"
                multiple
                onChange={handleFileChange} // ใส่โค้ดการจัดการเมื่อมีการเลือกไฟล์ที่เปลี่ยนแปลงที่นี่
              />
              <label htmlFor="inputImg">
                <PhotoIcon className="w-8 h-8" />
              </label>
            </IconButton>
            <IconButton variant="text" className="hover:bg-tao text-e-300">
              <MapPinIcon className="w-8 h-8" />
            </IconButton>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={sendDataCommunityPost}
              size="md"
              className="rounded-md bg-prim hover:bg-prim2 text-a"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
