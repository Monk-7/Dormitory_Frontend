import React, { useState, useEffect } from "react";
import { MenuItem, Typography } from "@material-tailwind/react";
import { BellIcon, BoltIcon, MegaphoneIcon } from "@heroicons/react/24/outline";

export default function Notify() {
  return (
    <div className="flex flex-col gap-2 w-[280px]">
      <MenuItem className="flex items-center justify-between ">
        <div className="flex item-center justify-between w-full">
          <div className="flex bg-red-300 p-1 item-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M1.5 4.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-9.586a.25.25 0 0 0-.177.073l-3.5 3.5A1.458 1.458 0 0 1 5 21.043V18.5H3.25a1.75 1.75 0 0 1-1.75-1.75ZM3.25 4a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.427-3.427A1.75 1.75 0 0 1 11.164 17h9.586a.25.25 0 0 0 .25-.25V4.25a.25.25 0 0 0-.25-.25ZM12 6a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 12 6m0 9a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
              />
            </svg>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-1 ml-3 w-full">
              <Typography
                color="gray"
                className="font-semibold text-sm text-blue-gray-700 "
              >
                You have new report !
              </Typography>
              <div className="flex justify-between  w-full">
                <Typography className="flex items-end  text-sm font-large text-blue-gray-600  ">
                  Building A - 101
                </Typography>
                <Typography className="flex items-end  text-xs font-normal text-blue-gray-300  ">
                  4 mins
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </MenuItem>

      <MenuItem className="flex items-center justify-between flex-col gap-2">
        <div className="flex item-center justify-between w-full">
          <div className="flex bg-green-500 p-1 item-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              >
                <path d="M10 44h28a2 2 0 0 0 2-2V14H30V4H10a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2M30 4l10 10" />
                <path d="m17 29l6 5l9-11" />
              </g>
            </svg>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-1 ml-3 w-full">
              <Typography
                color="gray"
                className="font-semibold text-sm text-blue-gray-700 "
              >
                You have new bill.
              </Typography>
              <div className="flex justify-between  w-full">
                <Typography className="flex items-end  text-sm font-large text-blue-gray-600  ">
                  Building A - 301
                </Typography>
                <Typography className="flex items-end  text-xs font-normal text-blue-gray-300  ">
                  2 Feb
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </MenuItem>

      <MenuItem className="flex items-center justify-between flex-col gap-2">
        <div className="flex item-center justify-between w-full">
          <div className="flex bg-yellow-700 p-1 item-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="white" stroke-width="1.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.5 9.5L12 4l9.5 5.5"
                />
                <path d="M7 21v-1a5 5 0 0 1 10 0v1" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                />
              </g>
            </svg>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-1 ml-3 w-full">
              <Typography
                color="gray"
                className="font-semibold text-sm text-blue-gray-700 "
              >
                You have a new renter.
              </Typography>
              <div className="flex justify-between  w-full">
                <Typography className="flex items-end  text-sm font-large text-blue-gray-600  ">
                  Building A - 209
                </Typography>
                <Typography className="flex items-end  text-xs font-normal text-blue-gray-300  ">
                  17 Jan
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </MenuItem>
    </div>
  );
}
