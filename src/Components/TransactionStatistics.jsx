import { useState, useEffect } from "react";
import axios from "axios";

const TransactionStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  const date = new Date(0, month - 1);
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `https://roxiler-be.onrender.com/api/products/sales?month=${month}`
      );
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 mt-10">
      <h1 className="text-center font-semibold text-2xl">Statistics of  <span className="font-bold">{monthName}</span> month </h1>
      <div className="flex space-x-4 mb-4 md:w-1/2 mt-1  mx-auto p-4">
        <div className="bg-blue-100 p-4 rounded shadow-md flex-1 ">
          <h3 className="font-semibold ">Total Sales</h3>
          <p> $ {statistics.totalSaleAmount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow-md flex-1">
          <h3 className="font-semibold">Total Sold Items</h3>
          <p>{statistics.totalSoldItems}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow-md flex-1">
          <h3 className="font-semibold">Total Not Sold Items</h3>
          <p>{statistics.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
