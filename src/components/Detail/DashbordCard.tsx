import React from "react";
import { Card } from "@material-tailwind/react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

export default function DashbordCard() {
  return (
    <div className="flex justify-between  gap-5">
      <Card className="w-full ">
        <div className="flex  p-5 items-center rounded">
          <div className="w-12 bg-yellow-500 rounded-full p-2">
            <UserGroupIcon />
          </div>
          <div className="ml-3 w-full ">
            <div className="font-bold">total</div>
            <div className="text-sm">Desc</div>
          </div>
        </div>
      </Card>
      <Card className="w-full ">
        <div className="flex  p-5 items-center rounded">
          <div className="w-12 bg-yellow-500 rounded-full p-2">
            <UserGroupIcon />
          </div>
          <div className="ml-3 w-full ">
            <div className="font-bold">total</div>
            <div className="text-sm">Desc</div>
          </div>
        </div>
      </Card>
      <Card className="w-full ">
        <div className="flex  p-5 items-center rounded">
          <div className="w-12 bg-yellow-500 rounded-full p-2">
            <UserGroupIcon />
          </div>
          <div className="ml-3 w-full ">
            <div className="font-bold">total</div>
            <div className="text-sm">Desc</div>
          </div>
        </div>
      </Card>
      <Card className="w-full ">
        <div className="flex  p-5 items-center rounded">
          <div className="w-12 bg-yellow-500 rounded-full p-2">
            <UserGroupIcon />
          </div>
          <div className="ml-3 w-full ">
            <div className="font-bold">total</div>
            <div className="text-sm">Desc</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
