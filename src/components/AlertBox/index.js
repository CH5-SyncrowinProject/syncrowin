import React from "react";
import { FaExclamationCircle, FaFilter, FaExclamationTriangle } from "react-icons/fa";
import { ClockIcon } from "@heroicons/react/24/solid";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { Avatar, MenuItem, MenuList, Typography } from "@mui/material";
import FilterDropdown from "components/FilterDropDown";
import MyCalendar from "components/Calendar";

const AlertBox = () => {
  const optionsFilter = [
    { value: "1", label: "Date" },
    { value: "2", label: "Type" },
    { value: "3", label: "Recipient" },
  ];

  const logs = [
    {
      id: 1,
      timestamp: "2024-07-02 10:00 AM",
      type: "System Alert",
      recipients: "mailto:email1@example.com",
      details: "Performance issue detected on server 3.",
      icon: <FaExclamationCircle />,
    },
    {
      id: 2,
      timestamp: "2024-07-02 09:30 AM",
      type: "Asset Change",
      recipients: "mailto:email2@example.com",
      details: "Configuration change on asset A123.",
      icon: <FaExclamationTriangle />,
    },
    {
      id: 3,
      timestamp: "2024-07-02 09:00 AM",
      type: "Maintenance Reminder",
      recipients: "mailto:email3@example.com",
      details: "Scheduled maintenance for asset B456.",
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="px-2 md:pl-6 text-start">
      <div className="max-h-96 overflow-y-auto">
        <SoftTypography
          className="text-start bg-theme sticky top-0"
          mb={1}
          fontWeight="medium"
          color="dark"
        >
          Alerts
        </SoftTypography>

        <div className="w-full p-4 md:px-6 py-3 bg-white border border-gray-200 rounded-lg  shadow-xl mb-3 text-start">
          <div className="flex items-center p-2 mb-3">
            <FilterDropdown
              className="w-1/2 md:w-fit"
              options={optionsFilter}
              buttonComponent={
                <div className="flex items-center gap-2 cursor-pointer">
                  <FaFilter className="text-base text-gray-600 dark:text-white" />
                  <SoftTypography
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    variant="h6"
                  >
                    Filter
                  </SoftTypography>
                </div>
              }
            />
          </div>
          <MenuList className="w-max border-0">
            {logs.map((log) => (
              <MenuItem key={log.id} className="flex items-center gap-3">
                <div className="text-xl w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">{log.icon}</div>
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
      <div className="max-h-96 overflow-y-auto">
        <SoftTypography
          className="text-start bg-theme sticky top-0 z-20"
          my={1}
          fontWeight="medium"
          color="dark"
        >
          Calendar
        </SoftTypography>
        <form>
          <div className="grid grid-cols-1">
            <div className="w-full p-4 md:px-6 py-3 bg-white border border-gray-200 rounded-lg  shadow-xl mb-3 text-start">
              <MyCalendar />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertBox;