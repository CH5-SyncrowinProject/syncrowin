import SoftTypography from "components/SoftTypography";
import { Button, Datepicker, Tabs, Tooltip } from "flowbite-react";
import React from "react";
import {
  FaArrowCircleLeft,
  FaCalendar,
  FaChartArea,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaCopy,
  FaEye,
  FaFilePdf,
  FaHandPointUp,
  FaSave,
  FaShare,
  FaUpload,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import TimeSeriesChart from "widgets/TimeSeriesChart";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";
import Dropdown from "components/Dropdown";
const options = [
  { value: "1", label: "Current Tab" },
  { value: "2", label: "All Tabs" },
];
const TimeSeries = () => {
  return (
    <>
      <DashboardLayout>
        <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4">
          <span className="flex gap-4 items-center absolute top-0 right-0 mt-2 mr-2 z-10">
            <Tooltip content="Save">
              <FaSave className="text-gray-500 text-sm cursor-pointer" />
            </Tooltip>
            <Tooltip content="Copy">
              <FaCopy className="text-gray-500 text-sm cursor-pointer" />
            </Tooltip>
            <Tooltip content="Export Pdf">
              <FaFilePdf className="text-gray-500 text-sm cursor-pointer" />
            </Tooltip>
            <Tooltip content="Share">
              <Dropdown
                options={options}
                buttonComponent={
                  <FaShare
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-gray-500 text-sm cursor-pointer"
                  />
                }
              />
            </Tooltip>
          </span>
          <SoftBox component={Link} to="/SystemAnalysis" className="flex gap-2 items-center mb-3">
            <FaArrowCircleLeft className="cursor-pointer" />
            <SoftTypography variant="h6" className="mb-0" fontWeight="medium">
              Robotic Arm A Project
            </SoftTypography>
          </SoftBox>
          <Tabs aria-label="Default tabs" variant="default">
            <Tabs.Item active title="Sensor-1">
              <div className="flex flex-col md:flex-row">
                <div className="basis-full md:basis-2/6">
                  <div>
                    <div className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center">
                        <FaHandPointUp />
                        <span className="text-base font-mono mt-3">Drag and drop assets here</span>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between  my-2">
                    <div className="h-10 w-full md:w-fit">
                      <SoftInput
                        className="w-full md:w-fit"
                        placeholder="Type here..."
                        icon={{ component: "search", direction: "left" }}
                      />
                    </div>
                    <FaCalendar className="text-base me-2" />
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4 my-2">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <span className="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                            <PrecisionManufacturingIcon />
                          </span>
                          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
                            Claton Factory
                          </h5>
                        </div>
                        {/* <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 cursor-pointer">
                          View
                        </span> */}
                      </div>
                      <Divider />

                      <ol className="relative border-s border-gray-200 dark:border-gray-700">
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-base font-semibold text-gray-900 dark:text-white">
                                Sensor 1{" "}
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  GWh
                                </span>
                              </h3>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium  px-2.5 cursor-pointer py-2 rounded dark:bg-gray-700 dark:text-gray-300">
                              <FaEye />
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Electric current
                          </p>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-base font-semibold text-gray-900 dark:text-white">
                                Sensor 2{" "}
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  KWh
                                </span>
                              </h3>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium  px-2.5 cursor-pointer py-2 rounded dark:bg-gray-700 dark:text-gray-300">
                              <FaEye />
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Electric current
                          </p>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-base font-semibold text-gray-900 dark:text-white">
                                Sensor 3{" "}
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  Celsius
                                </span>
                              </h3>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium  px-2.5 cursor-pointer py-2 rounded dark:bg-gray-700 dark:text-gray-300">
                              <FaEye />
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Temperature
                          </p>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-base font-semibold text-gray-900 dark:text-white">
                                Sensor 4{" "}
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  Celsius
                                </span>
                              </h3>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium  px-2.5 cursor-pointer py-2 rounded dark:bg-gray-700 dark:text-gray-300">
                              <FaEye />
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Temperature
                          </p>
                        </li>
                      </ol>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4 my-2">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <span className="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                            <PrecisionManufacturingIcon />
                          </span>
                          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
                            Geelong Factory
                          </h5>
                        </div>
                        {/* <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 cursor-pointer">
                          View
                        </span> */}
                      </div>
                      <Divider />

                      <ol className="relative border-s border-gray-200 dark:border-gray-700">
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-base font-semibold text-gray-900 dark:text-white">
                                Sensor 1{" "}
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  GWh
                                </span>
                              </h3>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium  px-2.5 cursor-pointer py-2 rounded dark:bg-gray-700 dark:text-gray-300">
                              <FaEye />
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Electric current
                          </p>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-base font-semibold text-gray-900 dark:text-white">
                                Sensor 2{" "}
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  KWh
                                </span>
                              </h3>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium  px-2.5 cursor-pointer py-2 rounded dark:bg-gray-700 dark:text-gray-300">
                              <FaEye />
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Electric current
                          </p>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-base font-semibold text-gray-900 dark:text-white">
                                Sensor 3{" "}
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  Celsius
                                </span>
                              </h3>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium  px-2.5 cursor-pointer py-2 rounded dark:bg-gray-700 dark:text-gray-300">
                              <FaEye />
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Temperature
                          </p>
                        </li>
                        <li className="mb-2 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-base font-semibold text-gray-900 dark:text-white">
                                Sensor 4{" "}
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  Celsius
                                </span>
                              </h3>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium  px-2.5 cursor-pointer py-2 rounded dark:bg-gray-700 dark:text-gray-300">
                              <FaEye />
                            </span>
                          </div>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Temperature
                          </p>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="basis-full md:basis-4/6 px-4">
                  <div className="flex  items-center mb-2">
                    <div className="flex gap-3 flex-col md:flex-row w-full md:w-fit items-center">
                      <div className="flex gap-3 items-center">
                        <Datepicker className="CustomDatePicker CustomDatePicker-Small" />
                        <Button size="sm" color="gray">
                          Compare
                        </Button>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Button size="md" color="gray">
                          <FaUpload />
                        </Button>
                        <Button.Group>
                          <Button color="gray" className=" rounded-r-none">
                            <FaChartPie />
                          </Button>
                          <Button color="gray">
                            <FaChartLine />
                          </Button>
                          <Button color="gray">
                            <FaChartBar />
                          </Button>
                          <Button color="gray" className="rounded-l-none">
                            <FaChartArea />
                          </Button>
                        </Button.Group>
                      </div>
                    </div>
                  </div>

                  <TimeSeriesChart />
                  <div className="grid md:grid-cols-2"></div>
                </div>
              </div>

              <Divider />
            </Tabs.Item>
            <Tabs.Item title="Sensor-2"></Tabs.Item>
            <Tabs.Item title="Sensor-3"></Tabs.Item>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default TimeSeries;
