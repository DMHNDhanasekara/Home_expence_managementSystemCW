import React, { useEffect, useState } from 'react';
import api from '../api';

export default function ExpenseList({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/expenses/user/${user.id}`);
      setExpenses(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Could not load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const onChange = () => load();
    window.addEventListener('expensesChanged', onChange);
    const itv = setInterval(load, 5000);
    return () => { window.removeEventListener('expensesChanged', onChange); clearInterval(itv); };
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await api.delete(`/expenses/${id}`);
      load();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const total = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

  return (
    <div style={{ maxWidth: 900 }}>
      <h3>Expenses</h3>
      {loading ? <p>Loading...</p> : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign:'left' }}>Date</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign:'left' }}>Category</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign:'left' }}>Description</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign:'right' }}>Amount</th>
                <th style={{ borderBottom: '1px solid #ccc' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id}>
                  <td style={{ padding: 6 }}>{e.expenseDate}</td>
                  <td style={{ padding: 6 }}>{e.category}</td>
                  <td style={{ padding: 6 }}>{e.description}</td>
                  <td style={{ padding: 6, textAlign: 'right' }}>{parseFloat(e.amount).toFixed(2)}</td>
                  <td style={{ padding: 6 }}>
                    <button onClick={() => handleDelete(e.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} style={{ textAlign: 'right', paddingTop: 8 }}>Total:</td>
                <td style={{ textAlign: 'right', paddingTop: 8 }}>{total.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          {expenses.length === 0 && <p style={{ color: '#666' }}>No expenses yet — add one above.</p>}
        </>
      )}
    </div>
  );
}
