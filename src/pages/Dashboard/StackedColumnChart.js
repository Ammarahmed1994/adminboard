import React from "react"
import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts"

const StackedColumnChart = ({ periodData }) => {
  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        show: 1
      },
      zoom: {
        enabled: !0
      }
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "15%"
        // endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: !1
    },
    xaxis: {
      show: true,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      labels: {
        show: true
      }
    },
    colors: ["#556ee6", "#f1b44c", "#34c38f"],
    legend: {
      position: "bottom"
    },
    fill: {
      opacity: 1
    }
  }


  const dd = [
    {
        "name": "Canceled",
        "data": [
            44,
            55,
            41,
            67,
            22,
            43,
            36,
            52,
            24,
            18,
            36,
            48
        ]
    },
    {
        "name": "Pending",
        "data": [
            13,
            23,
            20,
            8,
            13,
            27,
            18,
            22,
            10,
            16,
            24,
            22
        ]
    },
    {
        "name": "Completed",
        "data": [
            11,
            17,
            15,
            15,
            21,
            14,
            11,
            18,
            17,
            12,
            20,
            18
        ]
    }
]
  return (
 

    <React.Fragment>
      <ReactApexChart
        options={options}
        series={dd}
        type="bar"
        height="359"
        className="apex-charts"
      />
    </React.Fragment>
  );
}

StackedColumnChart.propTypes = {
  periodData: PropTypes.any
}
export default StackedColumnChart;
