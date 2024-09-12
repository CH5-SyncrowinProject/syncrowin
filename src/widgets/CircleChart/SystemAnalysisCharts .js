// SystemAnalysisCharts.js
import React from "react";
import CircleChart from "../CircleChart";
import SoftTypography from "components/SoftTypography";

const chartOptions = {
  chart: {
    height: 350,
    type: "radialBar",
    toolbar: { show: true },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: "70%",
        background: "#fff",
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: "#fff",
        strokeWidth: "67%",
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },
      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: "#888",
          fontSize: "17px",
        },
        value: {
          formatter: (val) => parseInt(val),
          color: "#111",
          fontSize: "36px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#ABE5A1"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: { lineCap: "round" },
  labels: ["Percent"],
};

const dummyData = [
  { series: [75], label: "CPU Usage" },
  { series: [50], label: "Memory Usage" },
  { series: [30], label: "Disk Usage" },
  { series: [90], label: "Network Traffic" },
];

const SystemAnalysisCharts = () => {
  return (
    <div >
      <div className="grid md:grid-cols-4 gap-3">
        {dummyData.map((data, index) => (
          <div key={index}>
               <SoftTypography variant="h6" fontWeight="medium" mb={2}>
            {data.label}
          </SoftTypography>
            <CircleChart series={data.series} options={chartOptions} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemAnalysisCharts;
