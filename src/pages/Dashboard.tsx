import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import {
  CheckCircleIcon,
  Square3Stack3DIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import DashbordCard from "../components/Detail/DashbordCard";
import { MinusCircleIcon } from "@heroicons/react/24/solid";

const BarchartConfig = {
  type: "bar",
  height: 300,
  series: [
    {
      name: "Sales",
      data: [
        10000, 25000, 30000, 50000, 40000, 30000, 32000, 50000, 35000, 20000,
        23000, 30000,
      ],
    },
  ],
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
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

const PiechartConfig = {
  type: "pie",
  width: 300,
  height: 300,
  series: [67, 33],
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
    colors: ["#00897b", "#d81b60"],
    legend: {
      show: false,
    },
  },
};

export default function Dashboard() {
  return (
    <div className="container mx-auto mt-5 mb-10 min-w-[550px] w-[60%]">
      <Typography variant="h5" className="mb-5">
        Dashboard
      </Typography>
      <div className="mb-5">
        <DashbordCard />
      </div>
      <Card className="mb-5">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="m-3">
            <Typography variant="h5" className="mb-1">
              Summary of dormitory rental income
            </Typography>

            <Typography color="gray" className="max-w-sm font-normal mb-3">
              from January to December 2023
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0  w-full">
          <Chart {...BarchartConfig} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="mt-3 mx-3">
            <Typography variant="h5" className="mb-1 ">
              Analyze monthly rental income
            </Typography>

            <Typography color="gray" className="max-w-sm font-normal">
              December / 2023
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-5 flex">
          <Chart {...PiechartConfig} />
          <div className="w-full mx-10 flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <CheckCircleIcon width={20} color="green" />
                <Typography variant="h6">
                  Total amount paid by renters
                </Typography>
              </div>
              <Typography variant="h6">20,000 Baht</Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography className="ml-2">Room Fee</Typography>
              <Typography>10,000 Baht</Typography>
            </div>
            <div className="flex justify-between">
              <Typography className="ml-10">Electric Fee</Typography>
              <Typography>5,000 Baht</Typography>
            </div>
            <div className="flex justify-between">
              <Typography className="ml-10">Water Fee</Typography>
              <Typography>3,000 Baht</Typography>
            </div>
            <div className="flex justify-between">
              <Typography className="ml-10">Other</Typography>
              <Typography>2,000 Baht</Typography>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <XCircleIcon width={20} color="red" />
                <Typography variant="h6">
                  Total amount unpaid by renters
                </Typography>
              </div>
              <Typography variant="h6">10,000 Baht</Typography>
            </div>
            <div className="flex justify-center mt-4">
              <Typography variant="h5">Total amount 30,000 Baht</Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
