import React, { useState } from "react";
import Transactions from "./Components/Transactions";
import TransactionStatistics from "./Components/TransactionStatistics";
import PriceRangeChart from "./Components/PriceRangeChart";
import PriceRangePieChart from "./Components/PriceRangePieChart";

const App = () => {
  const [month, setMonth] = useState("3");

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <div className="p-3 pb-10">
      <h1 className="text-3xl p-2 text-center font-bold">Transaction Data</h1>

      <Transactions month={month} onMonthChange={handleMonthChange} />
      <TransactionStatistics month={month} />
      <PriceRangeChart month={month} />
      <PriceRangePieChart month={month} />
    </div>
  );
};

export default App;
