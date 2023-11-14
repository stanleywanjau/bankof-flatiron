import Filter from "./Filter";
import React ,{ useState , useEffect} from "react";
function Transaction({ Transactions ,onDelete}){
  const [filteredTransactions, setFilteredTransactions] = useState(Transactions);
  const [sortOrder, setSortOrder] = useState("asc"); 
  useEffect(() => {
    // Set filteredTransactions to the original list of transactions when the component mounts
    setFilteredTransactions(Transactions);
  }, [Transactions]);

  const handleFilter = (filterText) => {
    let filtered;
    if (filterText.length >= 3) {
      // Only search for a specific description if filterText is at least 3 characters long
      filtered = Transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(filterText.toLowerCase())
      );
    } else {
      // If filterText is less than 3 characters, show all transactions
      filtered = Transactions;
    }
    setFilteredTransactions(filtered);
  };
  function handleSort (field) {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      if (newOrder === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setFilteredTransactions(sortedTransactions);
  };


  return(
    <div>
      <Filter onFilter={handleFilter}/>
      <table>
    <thead>
        <tr>
            <th onClick={() => handleSort("date")}>Date</th>
            <th onClick={() => handleSort("description")}>Description</th>
            <th onClick={() => handleSort("category")}>Category</th>
            <th onClick={() => handleSort("amount")}>Amount</th>
            <th>delete</th>
        </tr>
    </thead>
    <tbody>
   { filteredTransactions.map((Transaction,index)=>(
    
      <tr key={index}>
        <td>{Transaction.date}</td>
        <td>{Transaction.description}</td>
        <td>{Transaction.category}</td>
        <td>{Transaction.amount}</td>
        <td>
          <button onClick={() => onDelete(Transaction.id)}>
            Delete
            </button>
            </td>
      </tr>
    )
  )}
    </tbody>
</table>
    </div>
  )
}

export default Transaction;