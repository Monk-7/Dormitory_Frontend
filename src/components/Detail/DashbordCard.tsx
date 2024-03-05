import { Card } from "@material-tailwind/react";
import {
  ArrowLeftOnRectangleIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function DashbordCard() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      <Card className="w-full">
        <div className="flex p-5 items-center rounded">
          <div className="w-12 bg-prim rounded-full p-2">
            <BuildingOfficeIcon />
          </div>
          <div className="ml-3 w-full ">
            <div className="font-bold">All Rooms</div>
            <div className="text-sm">50 Rooms</div>
          </div>
        </div>
      </Card>
      <Card className="w-full">
        <div className="flex p-5 items-center rounded">
          <div className="w-12 bg-green-300 rounded-full p-2">
            <ArrowLeftOnRectangleIcon />
          </div>
          <div className="ml-3 w-full">
            <div className="font-bold">Occupancy Rate</div>
            <div className="text-sm">80% (40 Rooms)</div>
          </div>
        </div>
      </Card>
      <Card className="w-full">
        <div className="flex  p-5 items-center rounded">
          <div className="w-12 bg-tao rounded-full p-2">
            <UserGroupIcon />
          </div>
          <div className="ml-3 w-full ">
            <div className="font-bold">Available Room</div>
            <div className="text-sm">10 Rooms</div>
          </div>
        </div>
      </Card>
      <Card className="w-full">
        <div className="flex p-5 items-center rounded">
          <div className="w-12 bg-red-300 rounded-full p-2">
            <ClockIcon />
          </div>
          <div className="ml-3 w-full">
            <div className="font-bold">Unpaid</div>
            <div className="text-sm">20 Rooms</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
