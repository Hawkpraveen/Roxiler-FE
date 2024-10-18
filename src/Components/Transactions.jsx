import { useState, useEffect } from "react";
import axios from "axios";

const Transactions = ({ month, onMonthChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState({});

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/transactions?month=${month}&search=${search}&page=${page}`
      );
      setTransactions(response.data.products);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleMonthChange = (e) => {
    onMonthChange(e.target.value);
    setPage(1);
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const truncateDescription = (description, wordLimit = 10) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  return (
    <div className="pt-10 p-2 bg-gray-100 rounded-lg shadow-lg">
      {/* Search box and month select */}
      <div className="md:flex grid grid-cols-1 p-2 md:justify-between md:items-center mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={handleSearch}
          className="border md:p-2 pb-4 mb-2 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={month}
          onChange={handleMonthChange}
          className="border md:p-2 pb-4 mb-2 rounded-md w-full md:w-1/3  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("en-US", { month: "long" })}
            </option>
          ))}
        </select>
        <div className=" font-semibold uppercase">
          Total Products: {transactions.length}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left text-sm leading-normal">
              <th className="py-2 px-3 text-center font-semibold">ID</th>
              <th className="py-2 px-3 text-center font-semibold">Title</th>
              <th className="py-2 px-3 text-center font-semibold">
                Description
              </th>
              <th className="py-2 px-3 text-center font-semibold">Price</th>
              <th className="py-2 px-3 text-center font-semibold">Category</th>
              <th className="py-2 px-3 text-center font-semibold">Sold</th>
              <th className="py-2 px-3 text-center font-semibold">Image</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-2 px-3 text-center">{transaction.id}</td>

                {/* Title with expand/collapse */}
                <td className="py-2 px-3 text-center">
                  <p
                    className={`cursor-pointer ${
                      expanded[transaction.id] ? "" : "truncate"
                    }`}
                    onClick={() => toggleExpand(transaction.id)}
                  >
                    {transaction.title}
                  </p>
                </td>

                <td className="py-2 px-3 text-center">
                  <p
                    className={`cursor-pointer ${
                      expanded[transaction.id] ? "" : "truncate"
                    }`}
                    onClick={() => toggleExpand(transaction.id)}
                  >
                    {expanded[transaction.id]
                      ? transaction.description
                      : truncateDescription(transaction.description)}
                  </p>
                </td>

                <td className="py-2 px-3 text-center">${transaction.price}</td>
                <td className="py-2 px-3 text-center">
                  {transaction.category}
                </td>

                <td
                  className={`py-2 px-3 text-center font-semibold ${
                    transaction.sold ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.sold ? "Sold" : "Not Sold"}
                </td>

                <td className="py-2 px-3 text-center">
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;
