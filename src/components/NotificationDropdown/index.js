import React, { useState } from "react";
import PropTypes from "prop-types";
import SoftButton from "components/SoftButton";
import FilterDropdown from "components/FilterDropDown";
import { FaCog, FaEllipsisH, FaEye, FaFilter, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { BiCog } from "react-icons/bi";
import Dropdown from "components/Dropdown";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { Avatar, MenuItem, MenuList, Typography } from "@mui/material";
import { ClockIcon, CreditCardIcon } from "@heroicons/react/24/solid";

const options = [
  {
    value: "1",
    label: (
      <span  className="flex items-center">
        <FaPen className="mr-2 text-sky-500" />
        Edit
      </span>
    ),
  },
  {
    value: "2",
    label: (
      <span className="flex items-center">
        <FaPlus className="mr-2 text-gray-800" />
        Add
      </span>
    ),
  },
];

const optionsFilter = [
  { value: "1", label: "Date" },
  { value: "2", label: "Type" },
  { value: "3", label: "Recipient" },
];

const NotificationDropdown = ({ buttonComponent }) => {
 
  const [isVisible, setIsVisible] = useState(false);
  const options = [
    {
      value: "1",
      label: (
        <span  className="flex items-center">
          <FaPen className="mr-2 text-sky-500" />
          Edit
        </span>
      ),
    },
    {
      value: "2",
      label: (
        <span className="flex items-center">
          <FaPlus className="mr-2 text-gray-800" />
          Add
        </span>
      ),
    },
  ];
  
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

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const clonedButtonComponent = React.cloneElement(buttonComponent, {
    onClick: toggleDropdown,
  });

  const [enabledStates, setEnabledStates] = useState({
    systemAlerts: false,
    assetChanges: false,
    newDocuments: false,
    scheduledMaintenance: false,
    workflowChanges: false,
  });
  const [muteStates, setMuteStates] = useState({
    systemAlerts: false,
    assetChanges: false,
    newDocuments: false,
    scheduledMaintenance: false,
    workflowChanges: false,
  });
  const handleClick = (section) => {
    setEnabledStates((prevStates) => ({
      ...prevStates,
      [section]: !prevStates[section],
    }));
  };

  const handleMuteClick = (section) => {
    setMuteStates((prevStates) => ({
      ...prevStates,
      [section]: !prevStates[section],
    }));
  };
  const renderSection = (title, sectionKey) => (
    <div className="flex items-center flex-wrap justify-between border-b-2 border-gray-200 pb-2">
      <SoftTypography  className="w-3/5 md:w-1/3 mb-2 md:mb-0" variant="h6">
        {title}
      </SoftTypography>
      <button
        onClick={() => handleClick(sectionKey)}
        className={`md:w-1/12 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full border ${
          enabledStates[sectionKey] ? "bg-green-100 text-green-800  border-green-400" : "bg-red-100 text-red-800 border-red-400"
        }`}
      >
        {enabledStates[sectionKey] ? "Disable" : "Enable"}
      </button>
      <button
        onClick={() => handleMuteClick(sectionKey)}
        className={`md:w-1/12 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full border ${
          muteStates[sectionKey] ? "bg-yellow-100 text-yellow-800 border-yellow-400" : "bg-sky-100 text-sky-800 border-sky-400"
        }`}
      >
        {muteStates[sectionKey] ? "Unmute" : "Mute"}
      </button>
      <div className="w-4/5 md:w-fit flex gap-2 items-center">
        <select
          id="frequency"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 text-xs"
        >
          <option selected>Choose a frequency</option>
          <option>Immediate</option>
          <option>Daily Digest</option>
        </select>
        <select
          id="priority"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 text-xs"
        >
          <option selected>Choose a priority</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <Dropdown
        className="w-1/5"
        options={options}
        buttonComponent={
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-blue-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <FaEllipsisH className="w-5 h-5 text-gray-600" />
          </button>
        }
      />
    </div>
  );

  return (
     <>
    <div className="dropdown relative pt-2">
      {clonedButtonComponent}
      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-10 right-0 shadow-lg right-34 mt-1 p-4 bg-white divide-y divide-gray-100 rounded-lg min-50rem w-max dark:bg-gray-700 text-start"
        >
          <SoftTypography variant="h4" >Notification Logs</SoftTypography>
      
          <div className="flex items-center justify-between p-2">
            <FilterDropdown
              className="w-1/2 md:w-fit"
              options={optionsFilter}
              buttonComponent={
                <div className="flex items-center gap-2 cursor-pointer">
                {" "}
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
            <FaCog onClick={toggleVisibility} className="cursor-pointer" />
          </div>
          {isVisible && (
            <section className="w-full">
              {renderSection("System Alerts", "systemAlerts")}
              {renderSection("Asset Changes", "assetChanges")}
              {renderSection("New Documents/Data Signals/Maintenance Logs", "newDocuments")}
              {renderSection("Scheduled Maintenance Reminders", "scheduledMaintenance")}
              {renderSection("Workflow/Process Changes", "workflowChanges")}
            </section>
          )}
          <SoftBox className="w-full max-h-96 overflow-y-auto">
            <MenuList className="w-max border-0">
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
                    {/* <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                      Recipients: {log.recipients}
                    </Typography> */}
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </SoftBox>
       
        </div>
      )}
  
    </div>
      
      </>
  );
};

NotificationDropdown.propTypes = {
  buttonComponent: PropTypes.element.isRequired,
};

export default NotificationDropdown;
