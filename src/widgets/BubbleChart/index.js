import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Function to generate data (mock function, replace with actual implementation)
const generateData = (baseDate, count, range) => {
  const series = [];
  for (let i = 0; i < count; i++) {
    const x = baseDate + i * 86400000; // 1 day in milliseconds
    const y = Math.random() * (range.max - range.min) + range.min;
    const z = Math.random() * 100; // Bubble size
    series.push([x, y, z]);
  }
  return series;
};

const BubbleChart = () => {
  const series = [
    {
      name: 'Product1',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 })
    },
    {
      name: 'Product2',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 })
    },
    {
      name: 'Product3',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 })
    },
    {
      name: 'Product4',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, { min: 10, max: 60 })
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'bubble'
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient'
    },
    title: {
      text: '3D Bubble Chart'
    },
    xaxis: {
      tickAmount: 12,
      type: 'datetime',
      labels: {
        rotate: 0
      }
    },
    yaxis: {
      max: 70
    },
    theme: {
      palette: 'palette2'
    }
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg'>
      <ReactApexChart options={options} series={series} type="bubble"  />
    </div>
  );
};

export default BubbleChart;
