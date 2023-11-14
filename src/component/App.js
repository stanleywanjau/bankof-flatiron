import './App.css';
import { useState,useEffect } from 'react';
import Header from './Header';
import Transaction from './Transation';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(' http://localhost:3000/transactions')
  .then(res => res.json())
  .then(data => setTransactions(data));
 
  }, []);
  
   function handleSubmit(FormData){
    
    fetch('http://localhost:3000/transactions',{
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
      return fetch('http://localhost:3000/transactions');
    })
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(error => {
      console.error('Error:', error);
    });
  
}
function deleteTransaction (transactionId){
  fetch(`http://localhost:3000/transactions/${transactionId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the transaction from the server.');
      }
      return fetch('http://localhost:3000/transactions');
    })
    .then(res => res.json())
    .then(data => setTransactions(data))
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
