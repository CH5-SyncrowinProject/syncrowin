import { Divider } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import AnalysisDetails from "layouts/Analysis/components/AnalysisDetails";
import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProjectAnalysis = () => {
  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-lg p-4">
        <SoftBox
          className="flex gap-2 items-center mb-3 cursor-pointer"
          component={Link}
          to="/SystemAnalysis"
        >
          <FaArrowCircleLeft className="cursor-pointer" />
          <SoftTypography mb={0} variant="h5" fontWeight="medium" color="dark">
            Robotic Arm A Model
          </SoftTypography>
        </SoftBox>
        <AnalysisDetails />
      </div>
    </DashboardLayout>
  );
};
export default ProjectAnalysis;
