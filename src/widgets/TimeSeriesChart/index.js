import React from 'react';
import ReactApexChart from 'react-apexcharts';

class TimeSeriesChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Power Output',
        data: [
          { x: 'Feb', y: 450 },
          { x: 'Mar', y: 470 },
          { x: 'Apr', y: 430 },
          { x: 'May', y: 460 },
          { x: 'Jun', y: 490 },
          { x: 'Jul', y: 500 },
          { x: 'Aug', y: 520 },
          { x: 'Sep', y: 510 },
          { x: 'Oct', y: 530 }
        ]
      }, {
        name: 'Temperature',
        data: [
          { x: 'Feb', y: 60 },
          { x: 'Mar', y: 62 },
          { x: 'Apr', y: 59 },
          { x: 'May', y: 61 },
          { x: 'Jun', y: 65 },
          { x: 'Jul', y: 67 },
          { x: 'Aug', y: 69 },
          { x: 'Sep', y: 68 },
          { x: 'Oct', y: 70 }
        ]
      }, {
        name: 'Efficiency',
        data: [
          { x: 'Feb', y: 85 },
          { x: 'Mar', y: 87 },
          { x: 'Apr', y: 86 },
          { x: 'May', y: 88 },
          { x: 'Jun', y: 90 },
          { x: 'Jul', y: 91 },
          { x: 'Aug', y: 92 },
          { x: 'Sep', y: 90 },
          { x: 'Oct', y: 93 }
        ]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          title: {
            text: 'Values'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            }
          }
        }
      }
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" />
      </div>
    );
  }
}

export default TimeSeriesChart;
