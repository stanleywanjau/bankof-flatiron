import './App.css';
import { useState,useEffect } from 'react';
import Header from './Header';
import Transaction from './Transation';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('  https://my-json-server.typicode.com/stanleywanjau/bankof-flatiron/transactions')
  .then(res => res.json())
  .then(data => setTransactions(data));
 
  }, []);
  
   function handleSubmit(FormData){
    
    fetch('https://my-json-server.typicode.com/stanleywanjau/bankof-flatiron/transactions',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(FormData )
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send data to the server.')
      }
      return response.json();
    })
    
      .then((newTransaction) => {
        setTransactions([...transactions, newTransaction]);
      })
      .catch(error => {
      console.error('Error:', error);
    });
  
}
function deleteTransaction (transactionId){
  fetch(`https://my-json-server.typicode.com/stanleywanjau/bankof-flatiron/transactions/${transactionId}`, {
    method: 'DELETE',
    mode: 'cors',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the transaction from the server.');
      }
      setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
    })
    
    .catch(error => {
      console.error('Error:', error);
    });
};
   
  return (
    <div className="App">
      <h1> BANK OF FLATRION</h1>
      <Header onSubmit={handleSubmit}/>
      <Transaction Transactions={transactions} onDelete={deleteTransaction}/>
      
    </div>
  );
}

export default App;
