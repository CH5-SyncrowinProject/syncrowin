import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PowerConsumptionChart = () => {
  const series = [
    {
      data: [
        { x: '10 AM', y: [1200, 2000] },
        { x: '11 AM', y: [1400, 2200] },
        { x: '12 PM', y: [1600, 2500] },
        { x: '1 PM', y: [1300, 2100] },
        { x: '2 PM', y: [1700, 2300] },
        { x: '3 PM', y: [1800, 2400] },
        { x: '4 PM', y: [1500, 2200] }
      ]
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'rangeBar',
      zoom: {
        enabled: false
      },
      title: {
        text: 'Power Consumption',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      }
    },
    plotOptions: {
      bar: {
        isDumbbell: true,
        columnWidth: 3,
        dumbbellColors: [['#FF4560', '#FF4560']]
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      horizontalAlign: 'left',
      customLegendItems: ['Power Consumption']
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        gradientToColors: ['#FF4560'],
        inverseColors: true,
        stops: [0, 100]
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      tickPlacement: 'on'
    },
    yaxis: {
      title: {
        text: 'Vault',
        style: {
          fontSize: '12px'
        }
      }
    }
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg'>
      <ReactApexChart options={options} series={series} type="rangeBar" height={455}  />
    </div>
  );
};

export default PowerConsumptionChart;
