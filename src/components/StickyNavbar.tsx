import { useToggle } from "../hooks/useToggle";
import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

import logo from "../img/logo1.png";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  BellIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { checkLogin, login, registerFunc } from "../services/authService";
import apiClient from "../services/apiClient";
import { getCurrentUser, getUserId } from "../services/userService";
import AddDorm from "./Popup/AddDorm";
import { API } from "../services/configAPI";
import Notify from "./Popup/NotiButton";
import { Link } from "react-router-dom";

const profileMenuItems = [
  {
    label: "Edit Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const Links = [
  { name: "Management", path: "/" },
  { name: "Meter", path: "/meter" },
  { name: "Invoice", path: "/invoice" },
  { name: "Community", path: "/community" },
  { name: "Dashboard", path: "/dashboard" },
];

interface userInterface {
  userID: string;
  firstname: string;
  lastname: string;
  role: string;
}

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [proFileUrl, setProFileUrl] = useState<string>();
  const [userData, setUserData] = useState<userInterface>();

  const checkAuth = async () => {
    const checkAuthRes = await checkLogin();
    if (checkAuthRes === true) {
      setIsAuth(true);
      const data = getCurrentUser();
      setUserData(data);
      await getImgProFile(data.userID);
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

  useEffect(() => {
    checkAuth();
  }, []);

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuAction = (
      event: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
      setIsMenuOpen(false);
      if (event.currentTarget.name === "Edit Profile") {
        window.location.href = "/edit-profile";
      }
      if (event.currentTarget.name === "Sign Out") {
        localStorage.setItem("token", "");
        window.location.reload();
      }
    };

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-1 rounded-full py-0.5 pr-0.5 pl-0.5 lg:ml-auto  hover:bg-a text-d  "
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={proFileUrl}
            />
            <span className="normal-case mx-2 text-sm hidden xl:block">
              {userData?.firstname} {userData?.lastname}
            </span>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform hidden xl:block mr-2 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                name={label}
                onClick={menuAction}
                className={`flex items-center gap-2 hover:bg-prim focus:bg-prim2/[40%] active:bg-prim2/[40%] rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 "
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 text-e ${
                    isLastItem ? "text-red-500" : ""
                  }`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-bold text-e"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  const navList = (
    <ul className="my-4 flex flex-col gap-5 lg:my-0 lg:flex-row lg:items-center">
      {isAuth ? (
        Links.map((li) => (
          <Typography
            as="li"
            className="px-0 lg:px-5 font-bold text-d hover:text-prim"
          >
            <Link to={li.path} className="flex items-center">
              {li.name}
            </Link>
          </Typography>
        ))
      ) : (
        <div />
      )}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-[100] h-max max-w-full rounded-none px-5 py-2 md:px-10 md:py-[9px] min-w-[540px] bg-a">
      <div className="flex items-center justify-between text-d">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} width={40} />
          </Link>

          <div className="mx-4 hidden lg:block">{navList}</div>
        </div>
        <div className="flex items-center">
          {isAuth ? (
            <div className="flex gap-5 items-center">
              <button className="flex relative items-center">
                <BuildingOffice2Icon width={24} />
                <PlusCircleIcon
                  width={20}
                  className="absolute right-[-5px] top-[-7px] text-white"
                />
              </button>
              <AddDorm />
              <Notify />
              <ProfileMenu />
            </div>
          ) : (
            <div className="flex">
              <Button
                onClick={() => {
                  window.location.href = "/login";
                }}
                variant="outlined"
                color="white"
              >
                Log in
              </Button>
              <Button
                className="ml-5"
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Register
              </Button>
            </div>
          )}
          {isAuth ? (
            <IconButton
              variant="text"
              className="ml-5 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          ) : (
            <div />
          )}
        </div>
      </div>
      {isAuth ? <MobileNav open={openNav}>{navList}</MobileNav> : <div></div>}
    </Navbar>
  );
}
