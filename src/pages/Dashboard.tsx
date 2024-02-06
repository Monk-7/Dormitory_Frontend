import React from "react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

interface ChartConfig {
  type: string;
  width: number;
  height: number;
  series: number[];
  options: {
    chart: {
      toolbar: {
        show: boolean;
      };
    };
    title: {
      show: string;
    };
    dataLabels: {
      enabled: boolean;
    };
    colors: string[];
    legend: {
      show: boolean;
    };
  };
}

const chartConfig: ChartConfig = {
  type: "pie",
  width: 280,
  height: 280,
  series: [44, 55, 13, 43, 22],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
    legend: {
      show: false,
    },
  },
};

interface ChartCardProps {
  title: string;
  description: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description }) => {
  return (
    <Card className="w-80">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            {title}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            {description}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default function Dashboard() {
  return (
    <div>
      <ChartCard
        title="Bar Chart"
        description="Visualize your data in a simple way using the @material-tailwind/react chart plugin."
      />
      <ChartCard
        title="Line Chart"
        description="Visualize your data in a simple way using the @material-tailwind/react chart plugin."
      />
    </div>
  );
}
