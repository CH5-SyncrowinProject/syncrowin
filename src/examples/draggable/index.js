/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/
import { Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import statisticsCardsData from "data/statistics-cards-data";
import statisticsChartsData from "data/statistics-charts-data";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import Draggable from "react-draggable";
import StatisticsCard from "widgets/cards/statistics-card";
import StatisticsChart from "widgets/charts/statistics-chart";

// Assuming DashboardLayout, DashboardNavbar, and SoftBox are imported from their respective files
// import DashboardLayout from './DashboardLayout';
// import DashboardNavbar from './DashboardNavbar';
// import SoftBox from './SoftBox';

function DraggableComponent() {
  const [dragState, setDragState] = useState({});

  // const handleStart = (e, data) => {
  //   console.log("Event: ", e);
  //   console.log("Data: ", data);
  // };

  // const handleDrag = (e, data) => {
  //   console.log("Event: ", e);
  //   console.log("Data: ", data);
  // };

  // const handleStop = (e, data) => {
  //   console.log("Event: ", e);
  //   console.log("Data: ", data);
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {statisticsCardsData.map(({ icon, index, title, footer, ...rest }) => (
            <Draggable key={index}>
              <div className="statistics-card-wrapper cursor-grabbing">
                <StatisticsCard
                  key={title}
                  {...rest}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-6 h-6 text-white",
                  })}
                  footer={
                    <Typography className="font-normal text-blue-gray-600">
                      <strong className={footer.color}>{footer.value}</strong>
                      &nbsp;{footer.label}
                    </Typography>
                  }
                />
              </div>
            </Draggable>
          ))}
        </div>
      </SoftBox>
      <SoftBox mb={3}>
        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map(({ color, chart, index, title, description, footer }) => (
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
          ))}
        </div>
      </SoftBox>
    </DashboardLayout>
  );
}

export default DraggableComponent;

// Render the component
