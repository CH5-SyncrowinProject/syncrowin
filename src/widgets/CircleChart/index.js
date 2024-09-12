// ApexChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
const CircleChart = ({ series, options, height = 350 }) => {
  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="radialBar" height={height} />
    </div>
  );
};

CircleChart.propTypes = {
    series: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    height: PropTypes.number,
  };
  
  CircleChart.defaultProps = {
    height: 350,
  };
  
export default CircleChart;
