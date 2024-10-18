import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCategoryChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  });

  const date = new Date(0, month - 1);
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/category?month=${month}`
      );
      const data = response.data;

      const labels = data.map((item) => item.category);
      const counts = data.map((item) => item.itemCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Items",
            data: counts,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [month]);

  return (
    <div className=" flex justify-center">
      <div className="my-10 h-[400px] ">
        {" "}
        <h2 className="text-center text-2xl font-semibold mb-4">
          Category Distribution of <span className="font-bold">{monthName}</span> month
        </h2>
        <Pie data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default PieCategoryChart;
