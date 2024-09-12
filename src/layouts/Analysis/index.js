import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { FaBell, FaClock, FaFilter } from "react-icons/fa";
import React, { useState } from "react";
import FilterDropdown from "components/FilterDropDown";

import Modal from "components/Modal";
import { Link } from "react-router-dom";

import SoftTypography from "components/SoftTypography";

import { Icon } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { Accordion, Select, Table, Tabs, Textarea } from "flowbite-react";

import { Avatar, MenuItem, MenuList, Typography } from "@mui/material";
import { ClockIcon } from "@heroicons/react/24/solid";

const logs = [
  {
    id: 1,
    timestamp: "2024-07-02 10:00 AM",
    type: "System Alert",
    recipients: "email1@example.com",
    details: "Performance issue detected on server 3.",
    icon: "https://example.com/system-alert-icon.png",
  },
  {
    id: 2,
    timestamp: "2024-07-02 09:30 AM",
    type: "Asset Change",
    recipients: "email2@example.com",
    details: "Configuration change on asset A123.",
    icon: "https://example.com/asset-change-icon.png",
  },
  {
    id: 3,
    timestamp: "2024-07-02 09:00 AM",
    type: "Maintenance Reminder",
    recipients: "email3@example.com",
    details: "Scheduled maintenance for asset B456.",
    icon: "https://example.com/maintenance-icon.png",
  },
];
const optionsFilter = [
  { value: "1", label: "Date" },
  { value: "2", label: "Type" },
  { value: "3", label: "Size" },
  { value: "3", label: "Name" },
];

const Analysis = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3} mt={3}>
        <SoftBox mb={2} className="flex flex-col md:flex-row md:justify-between">
          <div className="h-10 w-full md:w-fit">
            <SoftInput
              className="w-full md:w-fit"
              placeholder="Type here..."
              icon={{ component: "search", direction: "left" }}
            />
          </div>
          <SoftBox className="w-full  md:w-fit flex justify-center md:justify-end items-center gap-3 mt-2 md:mt-0">
            <FilterDropdown
              className="w-full md:w-fit"
              options={optionsFilter}
              buttonComponent={
                <SoftButton
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  variant="gradient"
                  color="info"
                >
                  <FaFilter className="me-2" /> Filter
                </SoftButton>
              }
            />
            <SoftBox
              component={Link}
              to="/TimeSeries"
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
              <FaClock />
            </SoftBox>
            <SoftBox
              onClick={() => setShowAddProject(true)}
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
              <Icon fontSize="default" color="inherit">
                add
              </Icon>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <div>
          <Accordion className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg">
            <Accordion.Panel>
              <Accordion.Title>
                {" "}
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-blue-gray-300 divide-y divide-slate-200 dark:divide-slate-600">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:justify-between w-full p-3 border-gray-200 dark:border-slate-600 leading-tight">
                    <div className="flex items-center gap-2 w-full">
                      <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                        <PrecisionManufacturingIcon />
                      </span>
                      <span className="font-medium text-sm dark:text-white">M1923C</span>
                      <SoftBox
                        component={Link}
                        to="/ProjectAnalysis"
                        className="cursor-pointer text-gray-600 dark:text-gray-300 ps-2 truncate w-3/4 md:w-fit"
                      >
                        Robotic Arm A Project
                      </SoftBox>
                    </div>
                    <div className="flex gap-3 items-center w-full justify-start md:w-1/5 md:justify-between">
                      <span
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400"
                      >
                        {" "}
                        <FaBell />{" "}
                      </span>

                      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 whitespace-nowrap">
                        Need Maintenance
                      </span>
                    </div>
                  </div>
                </nav>
              </Accordion.Title>
              <Accordion.Content className="p-4">
                <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 w-full ">
                  <h2 className="text-xl font-extrabold dark:text-white mb-2 pl-4">Key Metrics</h2>

                  <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-4 bg-white dark:bg-gray-800">
                    <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                      <div className="mt-2 flex flex-col items-center">
                        <div className="text-lg font-bold leading-none tracking-tight text-sky-400 sm:text-4xl mb-2">
                          {" "}
                          21{" "}
                        </div>
                        <div className="text-lg font-medium text-sky-400 dark:text-sky-500">
                          {" "}
                          Active Machines{" "}
                        </div>
                      </div>
                    </figure>
                    <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:border-e dark:bg-gray-800 dark:border-gray-700">
                      <div className="mt-2 flex flex-col items-center">
                        <div className="text-lg font-bold leading-none tracking-tight text-rose-500  sm:text-4xl mb-2">
                          {" "}
                          92%{" "}
                        </div>
                        <div className="text-lg font-medium text-rose-400 dark:text-rose-400">
                          {" "}
                          Operational Efficiency{" "}
                        </div>
                      </div>
                    </figure>
                    <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:border-b-0 md:border-e dark:bg-gray-800 dark:border-gray-700 relative">
                      <div className="mt-2 flex flex-col items-center">
                        <div className="text-lg font-bold leading-none tracking-tight text-orange-400 sm:text-4xl mb-2">
                          {" "}
                          2 hours{" "}
                        </div>
                        <div className="text-lg font-medium text-orange-400 dark:text-orange-500">
                          {" "}
                          Downtime{" "}
                        </div>
                      </div>
                      <span className="absolute right-3 bottom-3 text-xs text-gray-500 dark:text-white font-semibold">
                        Last 24H
                      </span>
                    </figure>
                    <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700 relative">
                      <div className="mt-2 flex flex-col items-center ">
                        <div className="text-lg font-bold leading-none tracking-tight text-green-400 sm:text-4xl mb-2">
                          {" "}
                          3 Task{" "}
                        </div>
                        <div className="text-lg font-medium text-green-500 dark:text-green-400">
                          {" "}
                          Maintenance Completed{" "}
                        </div>
                      </div>
                      <span className="absolute right-3 bottom-3 text-xs text-gray-500 dark:text-white font-semibold">
                        Last 24H
                      </span>
                    </figure>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                {" "}
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-blue-gray-300 divide-y divide-slate-200 dark:divide-slate-600">
                  <SoftBox>
                    <div
                      role="button"
                      className="flex flex-col md:flex-row items-start md:items-center gap-2 md:justify-between w-full p-3 border-gray-200 dark:border-slate-600 leading-tight"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                          <PrecisionManufacturingIcon />
                        </span>
                        <span className="font-medium text-sm dark:text-white">M783</span>
                        <SoftBox className="cursor-pointer text-gray-600 dark:text-gray-300 ps-2 truncate w-3/4 md:w-fit">
                          Conveyor 12 Motor Optimisation
                        </SoftBox>
                      </div>
                      <div className="flex gap-3 items-center w-full justify-start md:w-1/5 md:justify-between">
                        <span
                          onClick={() => setShowModal(true)}
                          className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400"
                        >
                          {" "}
                          <FaBell />{" "}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 whitespace-nowrap">
                          Optimisation Insights
                        </span>
                      </div>
                    </div>
                  </SoftBox>
                </nav>
              </Accordion.Title>
              <Accordion.Content className="p-4">
                <div></div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                {" "}
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-blue-gray-300 divide-y divide-slate-200 dark:divide-slate-600">
                  <SoftBox>
                    <div
                      role="button"
                      className="flex flex-col md:flex-row items-start md:items-center gap-2 md:justify-between w-full p-3 border-gray-200 dark:border-slate-600 leading-tight"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                          <PrecisionManufacturingIcon />
                        </span>
                        <span className="font-medium text-sm dark:text-white">LN07</span>
                        <SoftBox className="cursor-pointer text-gray-600 dark:text-gray-300 ps-2 truncate w-3/4 md:w-fit">
                          Line North 7 Balancing
                        </SoftBox>
                      </div>
                      <div className="flex gap-3 items-center w-full justify-start md:w-1/5 md:justify-between">
                        <span
                          onClick={() => setShowModal(true)}
                          className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400"
                        >
                          {" "}
                          <FaBell />{" "}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 whitespace-nowrap">
                          No Action
                        </span>
                      </div>
                    </div>
                  </SoftBox>
                </nav>
              </Accordion.Title>
              <Accordion.Content className="p-4">
                <div></div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </SoftBox>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        size="max-w-lg"
        title=" Notifications Panel"
        showFooter={false}
      >
        <SoftBox mb={1}>
          <div>
            {/* <SoftTypography className="text-start" mb={1} fontWeight="medium" color="dark">
        Alerts
      </SoftTypography> */}

            <div className="w-full bg-white  rounded-lg  text-start">
              <div className="flex items-center p-2 mb-3">
                <FilterDropdown
                  className="w-1/2 md:w-fit"
                  options={optionsFilter}
                  buttonComponent={
                    <SoftTypography
                      className="flex items-center gap-2 cursor-pointer"
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      variant="h6"
                    >
                      <FaFilter className="me-2" /> Filter
                    </SoftTypography>
                  }
                />
              </div>
              <MenuList className="w-max border-0 max-h-96 overflow-y-auto">
                {logs.map((log) => (
                  <MenuItem key={log.id} className="flex items-center gap-3">
                    <Avatar src={log.icon} alt={`${log.type}-icon`} size="sm" variant="circular" />
                    <div className="flex-1">
                      <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                        <strong>{log.type}</strong> -{" "}
                        <div className="details-wrapper">{log.details}</div>
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" /> {log.timestamp}
                      </Typography>
                    </div>
                  </MenuItem>
                ))}
              </MenuList>
            </div>
          </div>
        </SoftBox>
      </Modal>
      <Modal
        showModal={showAddProject}
        setShowModal={setShowAddProject}
        size="max-w-lg"
        title="Add Project"
      >
        <SoftBox mb={1}>
          <div>
            <SoftBox mb={1}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Project Name
                </SoftTypography>
              </SoftBox>
              <SoftInput type="text" placeholder="Name" required />
            </SoftBox>
            <SoftBox mb={1}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Add Assets
                </SoftTypography>
              </SoftBox>
              <Select id="size" required>
                <option>Assets-1</option>
                <option>Assets-2</option>
                <option>Assets-3</option>
                <option>Assets-4</option>
              </Select>
            </SoftBox>

            <SoftBox mb={1}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Description
                </SoftTypography>
              </SoftBox>
              <Textarea placeholder="Enter company description" required rows={4} />
            </SoftBox>
          </div>
        </SoftBox>
      </Modal>
    </DashboardLayout>
  );
};

export default Analysis;
