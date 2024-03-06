import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Navbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import { BellIcon, BoltIcon } from "@heroicons/react/24/outline";
import Notify from "../Detail/Notify";


export default function NotiButton(props: any) {
  
  return (
    <div className="w-auto cursor-pointer">
      <Menu placement="bottom">
        <MenuHandler className="relative"> 
          <div>
          <BellIcon width={24} />
          {props.isNotify === "false" ? <div className="absolute top-[-43px] right-0 text-6xl text-red-500">.</div> : <div></div>}
          </div>
        </MenuHandler>
        <MenuList className="flex flex-row gap-2 w-auto cursor-pointer">
          <Notify />
        </MenuList>
      </Menu>
    </div>
  );
}
