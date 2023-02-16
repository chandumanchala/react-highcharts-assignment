import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";

const App = () => {
  const [selectedOption, setSelectedOption] = useState("column");

  var stackingOption;
  if (selectedOption === "bar") {
    stackingOption = "normal";
    //console.log("hi");
  } else {
    stackingOption = "";
    //console.log("hello");
  }

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("https://mocki.io/v1/121f634d-c011-4005-af10-c79d2c6b7c5b")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setChartData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //console.log(chartData);

  const config = {
    chart: {
      type: `${selectedOption}`,
    },
    plotOptions: {
      series: {
        stacking: `${stackingOption}`,
      },
    },

    title: {
      text: "Department Wise Total Users in each location",
    },
    xAxis: {
      categories: chartData.departments?.map((department) =>
        department.locations.map((location) => location.name)
      )[0],
      title: {
        text: "Location",
      },
    },
    yAxis: {
      title: {
        text: "Total Users",
      },
    },
    series: [
      {
        name: chartData.departments?.map((department) => department.name)[0],
        data: chartData.departments?.map((item) =>
          item.locations.map((users) => users.total_users)
        )[0],
      },
      {
        name: chartData.departments?.map((department) => department.name)[1],
        data: chartData.departments?.map((item) =>
          item.locations.map((users) => users.total_users)
        )[1],
      },
      {
        name: chartData.departments?.map((department) => department.name)[2],
        data: chartData.departments?.map((item) =>
          item.locations.map((users) => users.total_users)
        )[2],
      },
      {
        name: chartData.departments?.map((department) => department.name)[3],
        data: chartData.departments?.map((item) =>
          item.locations.map((users) => users.total_users)
        )[3],
      },
    ],
  };
  return (
    <div>
      <p className="selected_option">Selected option: {selectedOption}</p>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="column">Column</option>
        <option value="bar">Bar</option>
      </select>
      <HighchartsReact highcharts={Highcharts} options={config} />
    </div>
  );
};

export default App;
