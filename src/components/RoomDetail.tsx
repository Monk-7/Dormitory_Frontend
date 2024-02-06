import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import React from "react";

export default function RoomDetail() {
  return (
    <div className="text-sm">
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Room fee</span>
        <div className="col-span-3">
          <Input label="Room fee" color="black" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Furniture fee</span>
        <div className="col-span-3">
          <Input label="Furniture fee" color="black" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Internet fee</span>
        <div className="col-span-3">
          <Input label="Internet fee" color="black" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center my-4">
        <span className="text-right pr-5">Parking fee</span>
        <div className="col-span-3">
          <Input label="Parking fee" color="black" />
        </div>
      </div>
      <div className="flex items-center cursor-pointer text-sm">
        <PlusCircleIcon width={26} className="mr-2" />
        Add another
      </div>
    </div>
  );
}
