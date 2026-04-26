import React, { useEffect, useState } from "react";
import axios from "axios";

function Transaction() {

  const [transactions, setTransaction] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/transactions", config);
    setTransaction(res.data);
  }

  const filteredTransactions = transactions.filter((item) =>
    item.category?.toLowerCase().includes(search.toLowerCase()) ||
    item.ttype?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>Transaction History</h3>
      <br />

      <div className="mb-3">
        <input type="text" className="form-control" placeholder="search by category" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((item) => (
              <tr key={item.id}>
                <td>{item.tdate}</td>
                <td>
                  <span className={`badge ${item.ttype === 'income' ? 'bg-success' : 'bg-danger'}`}>
                    {item.ttype}
                  </span>
                </td>
                <td>{item.category}</td>
                <td>₹ {item.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted py-3">No transactions found</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );

}

export default Transaction;