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
import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";


import {statisticsChartsData} from "../../data//statistics-charts-data"
import {statisticsCardsData} from "../../data/statistics-cards-data"
import { Typography } from "@mui/material";
import StatisticsCard from "widgets/cards/statistics-card";
import StatisticsChart from "widgets/charts/statistics-chart";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import Draggable from "react-draggable";
function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
      <SoftBox py={3}>
        <div className="mb-4 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
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
        <div className="mb-4 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
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
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox> */}
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
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
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
