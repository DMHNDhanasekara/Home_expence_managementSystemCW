import React, { useState } from 'react';
import api from '../api';

export default function AddExpense({ user }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!amount || !expenseDate) { alert('Amount and date required'); return; }
    const payload = {
      userId: user.id,
      amount: parseFloat(amount),
      category,
      expenseDate,
      description
    };
    try {
      setLoading(true);
      await api.post('/expenses/add', payload);
      alert('Expense added');
      setAmount(''); setCategory(''); setExpenseDate(''); setDescription('');
      // notify to reload
      window.dispatchEvent(new Event('expensesChanged'));
    } catch (err) {
      alert('Add failed: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, maxWidth: 700 }}>
      <h3>Add Expense</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} style={{ padding: 8, width: 120 }} />
        <input type="date" value={expenseDate} onChange={e=>setExpenseDate(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} style={{ padding: 8, flex: 1 }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={{ padding: 8, width: '100%' }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={handleAdd} disabled={loading}>{loading ? 'Adding...' : 'Add Expense'}</button>
      </div>
    </div>
  );
}
