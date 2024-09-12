import React, { useCallback } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { FaReplyAll, FaExpand } from "react-icons/fa";
export function StatisticsChart({ color, chart, title, description, footer }) {
  const screen1 = useFullScreenHandle();
  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen1) {
        console.log("Screen 1 went to", state, handle);
      }
    },
    [screen1]
  );
  return (
    <FullScreen className="bg-white rounded-xl" handle={screen1} onChange={reportChange}>
      <div className="full-screenable-node">
        <Card className="border border-blue-gray-100 shadow-sm relative">
          <span className="flex gap-2 items-center absolute top-0 right-0 mt-2 mr-2 z-10">
            <FaReplyAll className="text-gray-500 text-sm cursor-pointer" onClick={screen1.exit} />
            <FaExpand className="text-gray-500 text-sm cursor-pointer" onClick={screen1.enter} />
          </span>
          <CardHeader variant="gradient" color={color} floated={false} shadow={false}>
            <Chart {...chart} />
          </CardHeader>
          <CardBody className="px-6 pt-0">
            <Typography variant="h6" color="blue-gray">
              {title}
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600">
              {description}
            </Typography>
          </CardBody>
          {footer && (
            <CardFooter className="border-t border-blue-gray-50 px-6 py-5">{footer}</CardFooter>
          )}
        </Card>
      </div>
    </FullScreen>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
