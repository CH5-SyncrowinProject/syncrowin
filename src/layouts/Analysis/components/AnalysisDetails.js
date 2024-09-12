import SoftTypography from "components/SoftTypography";
import { Button, Datepicker, Table, Tabs, Textarea, Tooltip } from "flowbite-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  FaCubes,
  FaHandPointUp,
  FaStar,
  FaRegDotCircle,
  FaThLarge,
  FaBars,
  FaChartBar,
  FaPlus,
  FaMinus,
  FaDivide,
  FaTimes,
  FaPercentage,
  FaGreaterThan,
  FaGreaterThanEqual,
  FaLessThan,
  FaLessThanEqual,
  FaEquals,
  FaSquareRootAlt,
  FaAlignRight,
  FaVial,
} from "react-icons/fa";

import VerticalBarChart from "./VerticalBarChart";
import { Divider, FormControlLabel, Icon, Switch } from "@mui/material";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import SoftBox from "components/SoftBox";
// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import SystemAnalysisCharts from "widgets/CircleChart/SystemAnalysisCharts ";
import StatisticsChart from "widgets/charts/statistics-chart";
import Draggable from "react-draggable";
import statisticsChartsData from "data/statistics-charts-data";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import { BellIcon, ArchiveBoxIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import BreakdownChart from "./BreakdownChart";
import SoftButton from "components/SoftButton";
import Dropdown from "components/Dropdown";
import Modal from "components/Modal";
const AnalysisChartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Maintenance Tasks",
      data: [15, 18, 12, 20, 22],
      color: "primary", // Assuming 'primary' is defined in your theme colors
    },
    {
      label: "Machine Downtime (hours)",
      data: [10, 8, 12, 9, 11],
      color: "secondary", // Assuming 'secondary' is defined in your theme colors
    },
  ],
};
const FormulaOptions = [
  {
    value: "1",
    label: (
      <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800 border-b">
        <div className="flex justify-between items-center">
          <p className="text-base text-gray-700 font-bold hover:text-gray-600">
            Mathematical Formula
          </p>
          <span className="font-light text-xs text-gray-600">Mar 10, 2019</span>
        </div>
        <div className="p-2 border border-gray-200 rounded-lg flex flex-wrap gap-2 max-w-60 md:max-w-96">
          <Button color="gray">
            <FaMinus />
          </Button>
          <Button size="sm" color="gray" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <FaSquareRootAlt /> Count{" "}
            </div>
          </Button>
          <Button color="gray">
            <FaTimes />
          </Button>
          <Button size="sm" color="gray" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <FaSquareRootAlt /> Average{" "}
            </div>
          </Button>
        </div>
      </div>
    ),
  },
  {
    value: "1",
    label: (
      <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800 border-b">
        <div className="flex justify-between items-center">
          <p className="text-base text-gray-700 font-bold hover:text-gray-600">
            Arithmetic Formula
          </p>
          <span className="font-light text-xs text-gray-600">July 10, 2022</span>
        </div>
        <div className="p-2 border border-gray-200 rounded-lg flex flex-wrap gap-2 max-w-60 md:max-w-96">
          <Button size="sm" color="gray" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <FaSquareRootAlt /> Count{" "}
            </div>
          </Button>
          <Button color="gray">
            <FaEquals />
          </Button>
          <Button size="sm" color="gray" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <FaSquareRootAlt /> Average{" "}
            </div>
          </Button>
          <Button color="gray">
            <FaLessThan />
          </Button>
        </div>
      </div>
    ),
  },
];
const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  datasets: [
    {
      label: "Series 1",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "#FF6384", // Custom hex color for Series 1
    },
    {
      label: "Series 2",
      data: [2, 3, 20, 5, 1],
      backgroundColor: "#36A2EB", // Custom hex color for Series 2
    },
    {
      label: "Series 3",
      data: [3, 10, 13, 15, 22],
      backgroundColor: "#4BC0C0", // Custom hex color for Series 3
    },
  ],
};

const AnalysisDetails = ({ recommendations }) => {
  const [showModal, setShowModal] = useState(false);
  const [machineName, setMachineName] = useState(recommendations?.machineName || "Steam turbine");
  const [sensor, setSensor] = useState(recommendations?.sensor || "Temperature");
  const [units, setUnits] = useState(recommendations?.units || "Celsius");
  const [frequency, setFrequency] = useState(recommendations?.frequency || "60 seconds");
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [isChecked, setIsChecked] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showFavouriteChart, setShowFavouriteChart] = useState(false);

  const handleFavouriteChartToggle = () => {
    setShowFavouriteChart(!showFavouriteChart);
  };
  const handleShowGrid = () => {
    setShowGrid(true);
  };

  const handleShowList = () => {
    setShowGrid(false);
  };
  // Handle toggle change
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="relative flex flex-col text-gray-700 w-ful">
        <Tabs aria-label="Default tabs" variant="default">
          <Tabs.Item active title="Monitor">
            <Tabs aria-label="Default tabs" variant="default">
              <Tabs.Item active title="Favourites">
                <div className="flex w-full justify-end mb-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={isChecked}
                      onChange={handleToggleChange}
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Grid View
                    </span>
                  </label>
                </div>

                {isChecked ? (
                  <SoftBox my={1}>
                    <SoftTypography>
                      <div className="flex gap-3 items-center mb-2">
                        <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                          <FaCubes />
                        </span>
                        <p className="text-gray-600 m-0 text-base">Power Consumption</p>
                      </div>
                    </SoftTypography>
                    <div className="grid  border border-gray-200 rounded-lg shadow-sm dark:border-gray-700  md:grid-cols-4 bg-white dark:bg-gray-800 overflow-hidden">
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200  md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-sky-400 sm:text-4xl mb-2">
                            {" "}
                            150 KWh
                          </div>
                          <div className="text-lg font-medium text-sky-400 dark:text-sky-500">
                            {" "}
                            Machines 1{" "}
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-rose-500  sm:text-4xl mb-2">
                            {" "}
                            45 KWh
                          </div>
                          <div className="text-lg font-medium text-rose-400 dark:text-rose-400">
                            {" "}
                            Machines 2{" "}
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-orange-400 sm:text-4xl mb-2">
                            {" "}
                            00 KWh
                          </div>
                          <div className="text-lg font-medium text-orange-400 dark:text-orange-500">
                            {" "}
                            Machines 3{" "}
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center ">
                          <div className="text-lg font-bold leading-none tracking-tight text-green-400 sm:text-4xl mb-2">
                            {" "}
                            20 KWh
                          </div>
                          <div className="text-lg font-medium text-green-500 dark:text-green-400">
                            {" "}
                            Machines 4{" "}
                          </div>
                        </div>
                      </figure>
                    </div>

                    <Divider />
                    <SoftTypography>
                      <div className="flex gap-3 items-center mb-2">
                        <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                          <FaCubes />
                        </span>
                        <p className="text-gray-600 m-0 text-base">Downtime</p>
                      </div>
                    </SoftTypography>
                    <div className="grid  border border-gray-200 rounded-lg shadow-sm dark:border-gray-700  md:grid-cols-4 bg-white dark:bg-gray-800 overflow-hidden">
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200  md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-sky-400 sm:text-4xl mb-2">
                            {" "}
                            58%
                          </div>
                          <div className="text-lg font-medium text-sky-400 dark:text-sky-500">
                            {" "}
                            Uncommented
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-rose-500  sm:text-4xl mb-2">
                            {" "}
                            5%
                          </div>
                          <div className="text-lg font-medium text-rose-400 dark:text-rose-400">
                            {" "}
                            Breakdown
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-orange-400 sm:text-4xl mb-2">
                            {" "}
                            25%
                          </div>
                          <div className="text-lg font-medium text-orange-400 dark:text-orange-500">
                            {" "}
                            Planned but Reduce OEE
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center ">
                          <div className="text-lg font-bold leading-none tracking-tight text-green-400 sm:text-4xl mb-2">
                            {" "}
                            72%
                          </div>
                          <div className="text-lg font-medium text-green-500 dark:text-green-400">
                            {" "}
                            Unplanned
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center ">
                          <div className="text-lg font-bold leading-none tracking-tight text-green-400 sm:text-4xl mb-2">
                            {" "}
                            38%
                          </div>
                          <div className="text-lg font-medium text-green-500 dark:text-green-400">
                            {" "}
                            Planned And Does not Reduce OEE
                          </div>
                        </div>
                      </figure>
                    </div>
                    <Divider />
                    <SoftTypography>
                      <div className="flex gap-3 items-center mb-2">
                        <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                          <FaCubes />
                        </span>
                        <p className="text-gray-600 m-0 text-base">Operational Throughput</p>
                      </div>
                    </SoftTypography>
                    <div className="grid  border border-gray-200 rounded-lg shadow-sm dark:border-gray-700  md:grid-cols-4 bg-white dark:bg-gray-800 overflow-hidden">
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200  md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-sky-400 sm:text-4xl mb-2">
                            {" "}
                            150 units/hour
                          </div>
                          <div className="text-lg font-medium text-sky-400 dark:text-sky-500">
                            {" "}
                            CNC Lathe
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-rose-500  sm:text-4xl mb-2">
                            {" "}
                            200 units/hour
                          </div>
                          <div className="text-lg font-medium text-rose-400 dark:text-rose-400">
                            {" "}
                            Injection Molder
                          </div>
                        </div>
                      </figure>
                      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                        <div className="mt-2 flex flex-col items-center">
                          <div className="text-lg font-bold leading-none tracking-tight text-orange-400 sm:text-4xl mb-2">
                            {" "}
                            118 units/hour
                          </div>
                          <div className="text-lg font-medium text-orange-400 dark:text-orange-500">
                            {" "}
                            Conveyor Belt
                          </div>
                        </div>
                      </figure>
                    </div>
                  </SoftBox>
                ) : (
                  <SoftBox>
                    {showGrid ? (
                      <SoftBox>
                        <div className="flex gap-3 items-center mb-2 justify-between">
                          <SoftTypography>
                            <div className="flex gap-3 items-center ">
                              <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                                <FaCubes />
                              </span>
                              <p className="text-gray-600 m-0 text-base">Power Consumption</p>
                            </div>
                          </SoftTypography>
                          <span
                            className="w-10 h-10 rounded-full text-base bg-gray-200 text-gray-700 dark:text-white flex items-center justify-center cursor-pointer"
                            onClick={handleShowList}
                          >
                            <FaBars />
                          </span>
                        </div>

                        <div className="grid  border border-gray-200 rounded-lg shadow-sm dark:border-gray-700  md:grid-cols-4 bg-white dark:bg-gray-800 overflow-hidden">
                          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200  md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                            <div className="mt-2 flex flex-col items-center">
                              <div className="text-lg font-bold leading-none tracking-tight text-sky-400 sm:text-4xl mb-2">
                                {" "}
                                150 KWh
                              </div>
                              <div className="text-lg font-medium text-sky-400 dark:text-sky-500">
                                {" "}
                                Machines 1{" "}
                              </div>
                            </div>
                          </figure>
                          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                            <div className="mt-2 flex flex-col items-center">
                              <div className="text-lg font-bold leading-none tracking-tight text-rose-500  sm:text-4xl mb-2">
                                {" "}
                                45 KWh
                              </div>
                              <div className="text-lg font-medium text-rose-400 dark:text-rose-400">
                                {" "}
                                Machines 2{" "}
                              </div>
                            </div>
                          </figure>
                          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                            <div className="mt-2 flex flex-col items-center">
                              <div className="text-lg font-bold leading-none tracking-tight text-orange-400 sm:text-4xl mb-2">
                                {" "}
                                00 KWh
                              </div>
                              <div className="text-lg font-medium text-orange-400 dark:text-orange-500">
                                {" "}
                                Machines 3{" "}
                              </div>
                            </div>
                          </figure>
                          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                            <div className="mt-2 flex flex-col items-center ">
                              <div className="text-lg font-bold leading-none tracking-tight text-green-400 sm:text-4xl mb-2">
                                {" "}
                                20 KWh
                              </div>
                              <div className="text-lg font-medium text-green-500 dark:text-green-400">
                                {" "}
                                Machines 4{" "}
                              </div>
                            </div>
                          </figure>
                        </div>
                      </SoftBox>
                    ) : (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4 border border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                              <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                                <FaCubes />
                              </span>
                              <p className="text-gray-600 m-0 text-base">Power Consumption</p>
                            </div>
                            <div className="flex gap-3 text-base items-center">
                              <FaChartBar
                                className="text-gray-500 dark:text-white cursor-pointer"
                                onClick={handleFavouriteChartToggle}
                              />
                              <FaThLarge
                                className="text-gray-500 dark:text-white cursor-pointer"
                                onClick={handleShowGrid}
                              />
                              <FaStar className="text-yellow-300" />
                            </div>
                          </div>
                          <Divider />
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Machine 1</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              150 KWh
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Machine 2</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              45 KWh
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Machine 3</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              80 KWh
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Machine 4</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              20 KWh
                            </span>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4 border border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                              <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                                <FaCubes />
                              </span>
                              <p className="text-gray-600 m-0 text-base">Downtime</p>
                            </div>

                            <div className="flex gap-3 text-base items-center">
                              <FaChartBar
                                className="text-gray-500 dark:text-white cursor-pointer"
                                onClick={handleFavouriteChartToggle}
                              />
                              <FaThLarge className="text-gray-500 dark:text-white cursor-pointer" />
                              <FaStar className="text-yellow-300" />
                            </div>
                          </div>
                          <Divider />
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Uncommented </p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              58%
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Breakdown</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              5%
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Planned but Reduce OEE</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              25%
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base"> Unplanned </p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              72%
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">
                                Planned And Does not Reduce OEE
                              </p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              38%
                            </span>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4 border border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                              <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                                <FaCubes />
                              </span>
                              <p className="text-gray-600 m-0 text-base">Operational Throughput</p>
                            </div>

                            <div className="flex gap-3 text-base items-center">
                              <FaChartBar
                                className="text-gray-500 dark:text-white cursor-pointer"
                                onClick={handleFavouriteChartToggle}
                              />
                              <FaThLarge className="text-gray-500 dark:text-white cursor-pointer" />
                              <FaStar className="text-yellow-300" />
                            </div>
                          </div>
                          <Divider />
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">CNC Lathe</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              150 units/hour
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Injection Molder</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              200 units/hour
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex gap-2 text-sm items-center">
                              <FaRegDotCircle className="text-gray-600" />
                              <p className="text-gray-600 m-0 text-base">Conveyor Belt</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              180 units/hour
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </SoftBox>
                )}
                <Divider />

                {showFavouriteChart && (
                  <div className="w-full">
                    <SoftTypography variant="h6" fontWeight="medium" mb={1}>
                      Power Consumption Graph
                    </SoftTypography>
                    <GradientLineChart
                      title="Power Consumption of Project"
                      description={
                        <SoftBox display="flex" alignItems="center">
                          <SoftBox
                            fontSize={size.lg}
                            color="success"
                            mb={0.3}
                            mr={0.5}
                            lineHeight={0}
                          >
                            <Icon className="font-bold">arrow_upward</Icon>
                          </SoftBox>
                          <SoftTypography variant="button" color="text" fontWeight="medium">
                            4% more{" "}
                            <SoftTypography variant="button" color="text" fontWeight="regular">
                              in 2021
                            </SoftTypography>
                          </SoftTypography>
                        </SoftBox>
                      }
                      height="20.25rem"
                      chart={gradientLineChartData}
                    />
                  </div>
                )}
              </Tabs.Item>
              <Tabs.Item title="Power Consumption">
                <SoftTypography>
                  <div className="flex gap-3 items-center mb-2">
                    <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                      <FaCubes />
                    </span>
                    <p className="text-gray-600 m-0 text-base">Power Consumption</p>
                  </div>
                </SoftTypography>
                <div className="grid  border border-gray-200 rounded-lg shadow-sm dark:border-gray-700  md:grid-cols-4 bg-white dark:bg-gray-800 overflow-hidden">
                  <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200  md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-2 flex flex-col items-center">
                      <div className="text-lg font-bold leading-none tracking-tight text-sky-400 sm:text-4xl mb-2">
                        {" "}
                        150 KWh
                      </div>
                      <div className="text-lg font-medium text-sky-400 dark:text-sky-500">
                        {" "}
                        Machines 1{" "}
                      </div>
                    </div>
                  </figure>
                  <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-2 flex flex-col items-center">
                      <div className="text-lg font-bold leading-none tracking-tight text-rose-500  sm:text-4xl mb-2">
                        {" "}
                        45 KWh
                      </div>
                      <div className="text-lg font-medium text-rose-400 dark:text-rose-400">
                        {" "}
                        Machines 2{" "}
                      </div>
                    </div>
                  </figure>
                  <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-2 flex flex-col items-center">
                      <div className="text-lg font-bold leading-none tracking-tight text-orange-400 sm:text-4xl mb-2">
                        {" "}
                        00 KWh
                      </div>
                      <div className="text-lg font-medium text-orange-400 dark:text-orange-500">
                        {" "}
                        Machines 3{" "}
                      </div>
                    </div>
                  </figure>
                  <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-2 flex flex-col items-center ">
                      <div className="text-lg font-bold leading-none tracking-tight text-green-400 sm:text-4xl mb-2">
                        {" "}
                        20 KWh
                      </div>
                      <div className="text-lg font-medium text-green-500 dark:text-green-400">
                        {" "}
                        Machines 4{" "}
                      </div>
                    </div>
                  </figure>
                </div>

                <Divider />
                <div className="flex flex-col md:flex-row">
                  <div className="basis-full md:basis-2/6 divide-y divide-gray-200  bg-white dark:bg-gray-800 px-3 border-r border-gray-200 dark:border-white">
                    <SoftTypography variant="h6" fontWeight="medium" mb={1}>
                      Assets List
                    </SoftTypography>
                    <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="font-light text-base text-gray-600">Mar 10, 2019</span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                          Motors
                        </span>
                      </div>
                      <div className="mt-1">
                        <a
                          className="text-base text-gray-700 font-bold hover:text-gray-600"
                          href="#"
                        >
                          Leblling Machine West
                        </a>
                      </div>
                    </div>
                    <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="font-light text-base text-gray-600">Jan 10, 2020</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Actuators
                        </span>
                      </div>
                      <div className="mt-1">
                        <a
                          className="text-base text-gray-700 font-bold hover:text-gray-600"
                          href="#"
                        >
                          SKU209 Production Line
                        </a>
                      </div>
                    </div>
                    <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="font-light text-base text-gray-600">May 13, 2024</span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Conveyors
                        </span>
                      </div>
                      <div className="mt-1">
                        <a
                          className="text-base text-gray-700 font-bold hover:text-gray-600"
                          href="#"
                        >
                          Baking Oven
                        </a>
                      </div>
                    </div>
                    <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="font-light text-base text-gray-600">Oct 28, 2024</span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          Sensors
                        </span>
                      </div>
                      <div className="mt-1">
                        <a
                          className="text-base text-gray-700 font-bold hover:text-gray-600"
                          href="#"
                        >
                          Sefty Plan
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="basis-full md:basis-4/6 px-4">
                    <SoftTypography variant="h6" fontWeight="medium" mb={1}>
                      Analyse Graph
                    </SoftTypography>
                    <GradientLineChart
                      title="Analysis of Project"
                      description={
                        <SoftBox display="flex" alignItems="center">
                          <SoftBox
                            fontSize={size.lg}
                            color="success"
                            mb={0.3}
                            mr={0.5}
                            lineHeight={0}
                          >
                            <Icon className="font-bold">arrow_upward</Icon>
                          </SoftBox>
                          <SoftTypography variant="button" color="text" fontWeight="medium">
                            4% more{" "}
                            <SoftTypography variant="button" color="text" fontWeight="regular">
                              in 2021
                            </SoftTypography>
                          </SoftTypography>
                        </SoftBox>
                      }
                      height="20.25rem"
                      chart={gradientLineChartData}
                    />
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Downtime"></Tabs.Item>
              <Tabs.Item title="Operational Throughput"></Tabs.Item>
              <Tabs.Item title="Operational Efficiency"></Tabs.Item>
              <Tabs.Item title="Custom">
                <div className="flex justify-end mb-2">
                  <Tooltip content="Create Formula">
                    <SoftBox
                      onClick={() => setShowModal(true)}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="3rem"
                      height="3rem"
                      bgColor="white"
                      shadow="sm"
                      borderRadius="50%"
                      color="dark"
                      sx={{ cursor: "pointer" }}
                    >
                      <FaVial />
                    </SoftBox>
                  </Tooltip>
                </div>
                <SoftTypography>
                  <div className="flex gap-3 items-center mb-2">
                    <span className="w-10 h-10 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center">
                      <FaCubes />
                    </span>
                    <p className="text-gray-600 m-0 text-base">Power Consumption</p>
                  </div>
                </SoftTypography>
                <div className="grid  border border-gray-200 rounded-lg shadow-sm dark:border-gray-700  md:grid-cols-4 bg-white dark:bg-gray-800 overflow-hidden">
                  <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200  md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-2 flex flex-col items-center">
                      <div className="text-lg font-bold leading-none tracking-tight text-sky-400 sm:text-4xl mb-2">
                        {" "}
                        150 KWh
                      </div>
                      <div className="text-lg font-medium text-sky-400 dark:text-sky-500">
                        {" "}
                        Machines 1{" "}
                      </div>
                    </div>
                  </figure>
                  <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-2 flex flex-col items-center">
                      <div className="text-lg font-bold leading-none tracking-tight text-rose-500  sm:text-4xl mb-2">
                        {" "}
                        45 KWh
                      </div>
                      <div className="text-lg font-medium text-rose-400 dark:text-rose-400">
                        {" "}
                        Machines 2{" "}
                      </div>
                    </div>
                  </figure>
                  <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-2 flex flex-col items-center">
                      <div className="text-lg font-bold leading-none tracking-tight text-orange-400 sm:text-4xl mb-2">
                        {" "}
                        00 KWh
                      </div>
                      <div className="text-lg font-medium text-orange-400 dark:text-orange-500">
                        {" "}
                        Machines 3{" "}
                      </div>
                    </div>
                  </figure>
                  <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-2 flex flex-col items-center ">
                      <div className="text-lg font-bold leading-none tracking-tight text-green-400 sm:text-4xl mb-2">
                        {" "}
                        20 KWh
                      </div>
                      <div className="text-lg font-medium text-green-500 dark:text-green-400">
                        {" "}
                        Machines 4{" "}
                      </div>
                    </div>
                  </figure>
                </div>

                <Divider />
                <div className="w-full px-4">
                  <SoftTypography variant="h6" fontWeight="medium" mb={1}>
                    Analyse Graph
                  </SoftTypography>
                  <GradientLineChart
                    title="Analysis of Project"
                    description={
                      <SoftBox display="flex" alignItems="center">
                        <SoftBox
                          fontSize={size.lg}
                          color="success"
                          mb={0.3}
                          mr={0.5}
                          lineHeight={0}
                        >
                          <Icon className="font-bold">arrow_upward</Icon>
                        </SoftBox>
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                          4% more{" "}
                          <SoftTypography variant="button" color="text" fontWeight="regular">
                            in 2021
                          </SoftTypography>
                        </SoftTypography>
                      </SoftBox>
                    }
                    height="20.25rem"
                    chart={gradientLineChartData}
                  />
                </div>
              </Tabs.Item>
            </Tabs>
          </Tabs.Item>
          <Tabs.Item title="Analyse">
            <Tabs aria-label="Default tabs" variant="default">
              <Tabs.Item title="Health Analytics">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold dark:text-white mb-2">Health Analytics</h2>
                </div>
                <SystemAnalysisCharts />
                <Divider />
                <div className="mb-4 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                  {statisticsChartsData.map(
                    ({ color, chart, index, title, description, footer }) => (
                      <Draggable key={index}>
                        <div className="statistics-card-wrapper cursor-grabbing">
                          <StatisticsChart
                            key={title}
                            color={color}
                            chart={chart}
                            title={title}
                            description={description}
                            footer={footer}
                          />
                        </div>
                      </Draggable>
                    )
                  )}
                </div>
              </Tabs.Item>
              <Tabs.Item title="Predictive Analysis">
                <div className="flex flex-col md:flex-row">
                  <div className="basis-full md:basis-2/6 px-3 bg-white dark:bg-gray-800 mb-2 md:mb-0">
                    <div>
                      <div className="flex h-96 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center">
                          <FaHandPointUp />
                          <span className="text-base font-mono mt-3">
                            Drag and drop assets here
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basis-full md:basis-4/6 px-4">
                    <div className="flex  items-center">
                      <div className="w-full md:w-fit flex flex-col md:flex-row gap-2">
                        <Datepicker className="CustomDatePicker md:mr-4" />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Anomaly Detection"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Trend Analytics"
                        />
                      </div>
                    </div>

                    <VerticalBarChart
                      title="Maintenance Trends"
                      description="Monthly maintenance tasks and machine downtime"
                      height={250}
                      chart={AnalysisChartData}
                    />
                  </div>
                </div>
                <Divider />
                <div className="flex flex-col md:flex-row">
                  <div className="basis-full md:basis-1/4 px-3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-white">
                    <SoftTypography variant="h6" fontWeight="medium" mb={1}>
                      Recommendations
                    </SoftTypography>
                    <Timeline className=" divide-y divide-gray-200">
                      <TimelineItem className="py-2">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white p-3 shadow-lg shadow-blue-gray-900/5">
                          <TimelineIcon
                            className="p-3 bg-gray-100 dark:bg-gray-600 rounded-full"
                            variant="ghost"
                          >
                            <BellIcon className="h-5 w-5" />
                          </TimelineIcon>
                          <div className="flex flex-col gap-1">
                            <Typography variant="h6" color="blue-gray">
                              $2400, Design changes
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              Description will come here
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal text-xs"
                            >
                              22 DEC 7:20 PM
                            </Typography>
                          </div>
                        </TimelineHeader>
                      </TimelineItem>
                      <TimelineItem className="py-2">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white p-3 shadow-lg shadow-blue-gray-900/5">
                          <TimelineIcon
                            className="p-3 bg-gray-100 dark:bg-gray-600 rounded-full"
                            variant="ghost"
                            color="red"
                          >
                            <ArchiveBoxIcon className="h-5 w-5" />
                          </TimelineIcon>
                          <div className="flex flex-col gap-1">
                            <Typography variant="h6" color="blue-gray">
                              Recommendations Title 2
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              Description will come here
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal text-xs"
                            >
                              21 DEC 11 PM
                            </Typography>
                          </div>
                        </TimelineHeader>
                      </TimelineItem>
                      <TimelineItem className="py-2">
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white p-3 shadow-lg shadow-blue-gray-900/5">
                          <TimelineIcon
                            className="p-3 bg-gray-100 dark:bg-gray-600 rounded-full"
                            variant="ghost"
                            color="green"
                          >
                            <CurrencyDollarIcon className="h-5 w-5" />
                          </TimelineIcon>
                          <div className="flex flex-col gap-1">
                            <Typography variant="h6" color="blue-gray">
                              Recommendations Title 3
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              Description will come here
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal text-xs"
                            >
                              20 DEC 2:20 AM
                            </Typography>
                          </div>
                        </TimelineHeader>
                      </TimelineItem>
                    </Timeline>
                  </div>
                  <div className="basis-full md:basis-2/4 px-3 border-r border-gray-200 dark:border-white">
                    <SoftTypography variant="h6" fontWeight="medium" mb={0}>
                      Breakadown Graph
                    </SoftTypography>
                    <BreakdownChart
                      chart={chartData}
                      title="Breakdown likely in 41 days"
                      description="A prediction of breakdown likelihood over the next 41 days."
                    />
                  </div>
                  <div className="basis-full md:basis-1/4 px-3 bg-white dark:bg-gray-800">
                    <div>
                      <SoftTypography variant="h6" fontWeight="medium" mb={1}>
                        Time Line
                      </SoftTypography>
                      <ol className="relative border-s border-gray-200 dark:border-gray-700">
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            Machine Name
                          </h3>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            The machine needs a {machineName}.
                          </p>
                          <Typography variant="small" color="gray" className="font-normal text-xs">
                            22 DEC 7:20 PM
                          </Typography>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            Sensor
                          </h3>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            The sensor type required is {sensor}.
                          </p>
                          <Typography variant="small" color="gray" className="font-normal text-xs">
                            20 DEC 10:44 PM
                          </Typography>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            Units
                          </h3>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            The units of measurement should be {units}.
                          </p>
                          <Typography variant="small" color="gray" className="font-normal text-xs">
                            19 DEC 9:20 AM
                          </Typography>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            Frequency
                          </h3>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            The data should be recorded every {frequency}.
                          </p>
                          <Typography variant="small" color="gray" className="font-normal text-xs">
                            18 DEC 4:35 AM
                          </Typography>
                        </li>
                      </ol>
                      <Divider />
                    </div>
                  </div>
                </div>
                <Divider />
              </Tabs.Item>
              <Tabs.Item title="Custom"></Tabs.Item>
            </Tabs>
          </Tabs.Item>
          <Tabs.Item title="Optimise">
            <Tabs.Item title="Maintenance Activities">
              <h2 className="text-xl font-extrabold dark:text-white mb-2 pl-4">
                Maintenance Activities
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Scheduled Date</Table.HeadCell>
                    <Table.HeadCell>Machine</Table.HeadCell>
                    <Table.HeadCell>Priority</Table.HeadCell>
                    <Table.HeadCell>Estimated Duration</Table.HeadCell>
                    <Table.HeadCell>Technician</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Replace Air Filters
                      </Table.Cell>
                      <Table.Cell>2024-07-15</Table.Cell>
                      <Table.Cell>HVAC System 1</Table.Cell>
                      <Table.Cell>
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Medium
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                          </svg>
                          2 Hours
                        </span>
                      </Table.Cell>
                      <Table.Cell>John Doe</Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Inspect Conveyor Belt
                      </Table.Cell>
                      <Table.Cell>2024-07-17</Table.Cell>
                      <Table.Cell>Conveyor Line A</Table.Cell>
                      <Table.Cell>
                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          High
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                          </svg>
                          3 Hours
                        </span>
                      </Table.Cell>
                      <Table.Cell>Jane Smith</Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Lubricate Bearings
                      </Table.Cell>
                      <Table.Cell>2024-07-18</Table.Cell>
                      <Table.Cell>Press Machine 5</Table.Cell>
                      <Table.Cell>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Low
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                          </svg>
                          1 Hour
                        </span>
                      </Table.Cell>
                      <Table.Cell>Bob Johnson</Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Calibrate Sensors
                      </Table.Cell>
                      <Table.Cell>2024-07-20</Table.Cell>
                      <Table.Cell>Robotics Arm 2</Table.Cell>
                      <Table.Cell>
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Medium
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                          </svg>
                          4 Hours
                        </span>
                      </Table.Cell>
                      <Table.Cell>Alice Brown</Table.Cell>
                    </Table.Row>

                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Software Update
                      </Table.Cell>
                      <Table.Cell>2024-07-22</Table.Cell>
                      <Table.Cell>Control System Server</Table.Cell>
                      <Table.Cell>
                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          High
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                          <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                          </svg>
                          2 Hours
                        </span>
                      </Table.Cell>
                      <Table.Cell>Mike Wilson</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </Tabs.Item>
          </Tabs.Item>
        </Tabs>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          showFooter={false}
          size="max-w-6xl"
          title="Formula Builder"
        >
          <div className="flex flex-col md:flex-row">
            <div className="basis-full md:basis-4/6">
              <div className="w-full">
                <div className="bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div className="p-3">
                    <div className="mb-2">
                      <div className="flex justify-between items-center">
                        <label className="block my-2 text-base font-medium text-gray-900 dark:text-white">
                          {" "}
                          Calculation Name
                        </label>
                        <Dropdown
                          options={FormulaOptions}
                          buttonComponent={
                            <SoftBox
                              id="dropdownDefaultButton"
                              data-dropdown-toggle="dropdown"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width="3rem"
                              height="3rem"
                              bgColor="white"
                              shadow="sm"
                              borderRadius="50%"
                              color="dark"
                              sx={{ cursor: "pointer" }}
                            >
                              <FaAlignRight />
                            </SoftBox>
                          }
                        />
                      </div>

                      <input
                        type="text"
                        className="ShowValue shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Mathematical"
                        required
                      />
                    </div>
                    <h2 className="text-base font-extrabold dark:text-white mb-2">
                      {" "}
                      Functions & Operators
                    </h2>
                    <div className="flex flex-col mb-2">
                      <SoftTypography component="label" variant="caption" fontWeight="bold" mb={1}>
                        Arithmetic Operators
                      </SoftTypography>
                      <Button.Group className="items-center flex-wrap">
                        <Button color="gray" className=" md:rounded-r-none">
                          <FaPlus />
                        </Button>
                        <Button color="gray">
                          <FaMinus />
                        </Button>
                        <Button color="gray">
                          <FaDivide />
                        </Button>
                        <Button color="gray">
                          <FaTimes />
                        </Button>
                        <Button color="gray">
                          <FaPercentage />
                        </Button>
                        <Button color="gray">
                          <FaGreaterThan />
                        </Button>
                        <Button color="gray">
                          <FaGreaterThanEqual />
                        </Button>
                        <Button color="gray">
                          <FaLessThan />
                        </Button>
                        <Button color="gray">
                          <FaLessThanEqual />
                        </Button>
                        <Button color="gray">
                          <FaEquals />
                        </Button>
                        <Button color="gray" className="ButtonGroupIcon">
                          ,
                        </Button>
                        <Button color="gray" className="ButtonGroupIcon">
                          (
                        </Button>
                        <Button color="gray" className="md:rounded-l-none ButtonGroupIcon">
                          )
                        </Button>
                      </Button.Group>
                    </div>
                    <div className="flex flex-col mb-2">
                      <SoftTypography component="label" variant="caption" fontWeight="bold" mb={1}>
                        Logical Operators
                      </SoftTypography>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm" color="gray">
                          if
                        </Button>
                        <Button size="sm" color="gray">
                          elseif
                        </Button>
                        <Button size="sm" color="gray">
                          else
                        </Button>
                        <Button size="sm" color="gray">
                          equal
                        </Button>
                        <Button size="sm" color="gray">
                          is not
                        </Button>

                        <Button size="sm" color="gray">
                          join
                        </Button>
                        <Button size="sm" color="gray">
                          or
                        </Button>
                        <Button size="sm" color="gray">
                          and
                        </Button>
                        <Button size="sm" color="gray">
                          return
                        </Button>
                        <Button size="sm" color="gray">
                          true
                        </Button>
                        <Button size="sm" color="gray">
                          false
                        </Button>
                        <Button size="sm" color="gray">
                          end
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col mb-2">
                      <SoftTypography component="label" variant="caption" fontWeight="bold" mb={1}>
                        Aggregrate Functions
                      </SoftTypography>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm" color="gray">
                          <div className="flex items-center gap-2">
                            <FaSquareRootAlt /> Sum{" "}
                          </div>
                        </Button>
                        <Button size="sm" color="gray" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <FaSquareRootAlt /> Count{" "}
                          </div>
                        </Button>
                        <Button size="sm" color="gray" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <FaSquareRootAlt /> Min{" "}
                          </div>
                        </Button>
                        <Button size="sm" color="gray" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <FaSquareRootAlt /> Max{" "}
                          </div>
                        </Button>
                        <Button size="sm" color="gray" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <FaSquareRootAlt /> Average{" "}
                          </div>
                        </Button>
                      </div>
                    </div>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Formula
                    </SoftTypography>
                    <Textarea id="comment" placeholder="Write formula here" required rows={4} />
                    <Divider />
                    <div className="flex items-center justify-end gap-3">
                      <SoftButton variant="gradient" color="info">
                        Save
                      </SoftButton>
                      <SoftButton variant="outlined" color="info">
                        Cancel
                      </SoftButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-full md:basis-2/6 divide-y divide-gray-200  bg-white dark:bg-gray-800 px-3 border-r border-gray-200 dark:border-white">
              <SoftTypography variant="h6" fontWeight="medium" mb={1}>
                Assets List
              </SoftTypography>
              <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-between items-center">
                  <span className="font-light text-base text-gray-600">Mar 10, 2019</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Motors
                  </span>
                </div>
                <div className="mt-1">
                  <a className="text-base text-gray-700 font-bold hover:text-gray-600" href="#">
                    Leblling Machine West
                  </a>
                </div>
              </div>
              <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-between items-center">
                  <span className="font-light text-base text-gray-600">Jan 10, 2020</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                    Actuators
                  </span>
                </div>
                <div className="mt-1">
                  <a className="text-base text-gray-700 font-bold hover:text-gray-600" href="#">
                    SKU209 Production Line
                  </a>
                </div>
              </div>
              <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-between items-center">
                  <span className="font-light text-base text-gray-600">May 13, 2024</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Conveyors
                  </span>
                </div>
                <div className="mt-1">
                  <a className="text-base text-gray-700 font-bold hover:text-gray-600" href="#">
                    Baking Oven
                  </a>
                </div>
              </div>
              <div className="max-w-4xl p-2 mb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-between items-center">
                  <span className="font-light text-base text-gray-600">Oct 28, 2024</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    Sensors
                  </span>
                </div>
                <div className="mt-1">
                  <a className="text-base text-gray-700 font-bold hover:text-gray-600" href="#">
                    Sefty Plan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

AnalysisDetails.propTypes = {
  recommendations: PropTypes.shape({
    machineName: PropTypes.string,
    sensor: PropTypes.string,
    units: PropTypes.string,
    frequency: PropTypes.string,
  }).isRequired,
};

AnalysisDetails.defaultProps = {
  recommendations: {
    machineName: "Steam turbine",
    sensor: "Temperature",
    units: "Celsius",
    frequency: "60 seconds",
  },
};
export default AnalysisDetails;
