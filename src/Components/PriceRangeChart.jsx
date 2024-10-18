import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PriceRangeChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [
      "0 - 100",
      "101 - 200",
      "201 - 300",
      "301 - 400",
      "401 - 500",
      "501 - 600",
      "601 - 700",
      "701 - 800",
      "801 - 900",
      "901 - Above",
    ],
    datasets: [
      {
        label: "Number of Items",
        data: new Array(10).fill(0), // Initialize data for each price range to zero
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  const date = new Date(0, month - 1);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );

  const fetchPriceRangeData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/bar-chart?month=${month}`
      );
      const data = response.data; // Assuming this is the correct format

      // Initialize counts for each price range
      const priceRangesCount = new Array(10).fill(0);

      // Map the counts from the API response to the corresponding price ranges
      data.forEach((item) => {
        const priceRange = item._id; // The price range key from the API
        const count = item.count; // The count of items in this price range

        // Assign the count to the corresponding range
        if (priceRange === 0) priceRangesCount[0] += count; // 0 - 100
        else if (priceRange >= 101 && priceRange <= 200)
          priceRangesCount[1] += count; // 101 - 200
        else if (priceRange >= 201 && priceRange <= 300)
          priceRangesCount[2] += count; // 201 - 300
        else if (priceRange >= 301 && priceRange <= 400)
          priceRangesCount[3] += count; // 301 - 400
        else if (priceRange >= 401 && priceRange <= 500)
          priceRangesCount[4] += count; // 401 - 500
        else if (priceRange >= 501 && priceRange <= 600)
          priceRangesCount[5] += count; // 501 - 600
        else if (priceRange >= 601 && priceRange <= 700)
          priceRangesCount[6] += count; // 601 - 700
        else if (priceRange >= 701 && priceRange <= 800)
          priceRangesCount[7] += count; // 701 - 800
        else if (priceRange >= 801 && priceRange <= 900)
          priceRangesCount[8] += count; // 801 - 900
        else if (priceRange === "901+") priceRangesCount[9] += count; // 901 - Above
      });

      // Update chart data
      setChartData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: priceRangesCount, // Set the counts for each range
          },
        ],
      }));
    } catch (error) {
      console.error("Error fetching price range data:", error);
    }
  };

  useEffect(() => {
    fetchPriceRangeData();
  }, [month]); // Re-fetch data whenever the month changes

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to be smaller
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Set step size for the y-axis ticks
        },
        title: {
          display: true,
          text: "Number of Items", // Y-axis label
        },
      },
      x: {
        title: {
          display: true,
          text: "Price Range", // X-axis label
        },
      },
    },
  };

  return (
    <div className="my-10 mx-auto w-3/4 h-[500px]">
      {" "}
      {/* Set width for the chart */}
      <h2 className="text-center text-2xl font-semibold mb-4">
        Price Range Distribution of{" "}
        <span className="font-bold">{monthName}</span> month
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PriceRangeChart;
