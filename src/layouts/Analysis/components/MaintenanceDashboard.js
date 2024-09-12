import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Table } from "flowbite-react";
import { Divider } from "@mui/material";

const localizer = momentLocalizer(moment);

const maintenanceActivities = [
  {
    title: "Replace Air Filters",
    scheduledDate: "2024-07-15",
    machine: "HVAC System 1",
    priority: "Medium",
    estimatedDuration: "2 hours",
    technician: "John Doe",
  },
  {
    title: "Inspect Conveyor Belt",
    scheduledDate: "2024-07-17",
    machine: "Conveyor Line A",
    priority: "High",
    estimatedDuration: "3 hours",
    technician: "Jane Smith",
  },
  {
    title: "Lubricate Bearings",
    scheduledDate: "2024-07-18",
    machine: "Press Machine 5",
    priority: "Low",
    estimatedDuration: "1 hour",
    technician: "Bob Johnson",
  },
  {
    title: "Calibrate Sensors",
    scheduledDate: "2024-07-20",
    machine: "Robotics Arm 2",
    priority: "Medium",
    estimatedDuration: "4 hours",
    technician: "Alice Brown",
  },
  {
    title: "Software Update",
    scheduledDate: "2024-07-22",
    machine: "Control System Server",
    priority: "High",
    estimatedDuration: "2 hours",
    technician: "Mike Wilson",
  },
];

const events = maintenanceActivities.map((activity) => ({
  title: activity.title,
  start: new Date(activity.scheduledDate),
  end: new Date(activity.scheduledDate),
}));

const MaintenanceDashboard = () => (
  <div>
    <h2>Calendar View</h2>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    <Divider />
    <h2 className="text-lg font-extrabold dark:text-white my-2 pl-4">
      Upcoming Maintenance Activities
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
          {maintenanceActivities.map((activity, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {activity.title}
              </Table.Cell>
              <Table.Cell>{activity.scheduledDate}</Table.Cell>
              <Table.Cell>{activity.machine}</Table.Cell>
              <Table.Cell>
                <span
                  className={`bg-${
                    activity.priority === "High"
                      ? "red"
                      : activity.priority === "Medium"
                      ? "green"
                      : "yellow"
                  }-100 text-${
                    activity.priority === "High"
                      ? "red"
                      : activity.priority === "Medium"
                      ? "green"
                      : "yellow"
                  }-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${
                    activity.priority === "High"
                      ? "red"
                      : activity.priority === "Medium"
                      ? "green"
                      : "yellow"
                  }-900 dark:text-${
                    activity.priority === "High"
                      ? "red"
                      : activity.priority === "Medium"
                      ? "green"
                      : "yellow"
                  }-300`}
                >
                  {activity.priority}
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
                  {activity.estimatedDuration}
                </span>
              </Table.Cell>
              <Table.Cell>{activity.technician}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  </div>
);

export default MaintenanceDashboard;
