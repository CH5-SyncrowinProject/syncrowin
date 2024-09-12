import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function BreakdownChart({ title, description, height, chart }) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: dataset.backgroundColor,
        fill: false,
        maxBarThickness: 35,
      }))
    : [];

  const data = {
    labels: chart.labels || [],
    datasets: chartDatasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "#e7eaf3",
          borderColor: "#e7eaf3",
          borderWidth: 1,
        },
      },
    },
  };

  return (
    <Card>
      <SoftBox p={2}>
        {title || description ? (
          <SoftBox px={description ? 1 : 0} pt={description ? 1 : 0}>
            {title && (
              <SoftBox mb={1}>
                <SoftTypography variant="h6">{title}</SoftTypography>
              </SoftBox>
            )}
            <SoftBox mb={2}>
              <SoftTypography
                component="div"
                variant="button"
                fontWeight="regular"
                color="text"
              >
                {description}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        ) : null}
        <SoftBox height={height}>
          <Bar data={data} options={options} />
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

BreakdownChart.defaultProps = {
  title: "Breakdown likely in 41 days",
  description: "",
  height: "300px",
};

BreakdownChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        backgroundColor: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default BreakdownChart;
