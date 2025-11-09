import React from 'react';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary'; // new

export default function Dashboard({ user, setUser }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {user.username}</h2>
        <div>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <AddExpense user={user} />
      </div>

      <div style={{ marginTop: 12 }}>
        <ExpenseList user={user} />
      </div>

      <div style={{ marginTop: 24 }}>
        <ExpenseSummary user={user} />
      </div>
    </div>
  );
}
