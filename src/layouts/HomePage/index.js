import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { statisticsChartsData } from "../../data/statistics-charts-data";
import { statisticsCardsData } from "../../data/statistics-cards-data";
import { Typography } from "@mui/material";
import StatisticsCard from "widgets/cards/statistics-card";
import StatisticsChart from "widgets/charts/statistics-chart";

import { Layout, Model } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import AlertBox from "components/AlertBox";
import HomeTable from "examples/scalebaleHomeTable";
import SoftButton from "components/SoftButton";

import { FaPlus } from "react-icons/fa";
import Dropdown from "components/Dropdown";
import MyCalendar from "components/Calendar";
import SoftTypography from "components/SoftTypography";

var json = {
  global: { tabSetEnableTabStrip: false },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: <HomeTable />,
            component: "button",
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: <AlertBox />,
            component: "button",
          },
      
        ],
      },
    ],
  },
};

const model = Model.fromJson(json);
const options = [
  { value: "1", label: "Create Custom Dashboard" },
  { value: "2", label: "Create Modelling" },
  { value: "3", label: "Create Component" },
];
export function Home() {
  const factory = (node) => {
    var component = node.getComponent();

    if (component === "button") {
      return <button>{node.getName()}</button>;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pb={3} pt={1}>
        <SoftBox py={1} className="flex justify-between">
          <SoftBox className="flex items-center gap-2">
            <SoftTypography   variant="h4" fontWeight="semibold" color="dark"  >
              Good morning,
            </SoftTypography>
            <SoftTypography   variant="h6" fontWeight="regular" color="text"  >
              07 July 2024
            </SoftTypography>
          </SoftBox>
          <Dropdown
            options={options}
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
                <Icon fontSize="default" color="inherit">
                  add
                </Icon>
              </SoftBox>
            }
          />
        </SoftBox>
        <SoftBox my={1} className="relative min-height-scalable">
          <Layout className="absolute top-0 right-0" model={model} factory={factory} />
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Home;
