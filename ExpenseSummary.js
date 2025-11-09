import React, { useEffect, useState } from 'react';
import api from '../api';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function ExpenseSummary({ user }) {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/expenses/user/${user.id}`);
      const expenses = res.data || [];

      // group by month and category
      const summaryMap = {}; // { category: totalAmount }
      expenses.forEach(exp => {
        const category = exp.category || 'Other';
        summaryMap[category] = (summaryMap[category] || 0) + parseFloat(exp.amount);
      });

      const labels = Object.keys(summaryMap);
      const data = Object.values(summaryMap);

      setSummary({ labels, data });
    } catch (err) {
      console.error(err);
      alert('Failed to load summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
    const onChange = () => loadSummary();
    window.addEventListener('expensesChanged', onChange);
    return () => window.removeEventListener('expensesChanged', onChange);
  }, [user]);

  if (loading) return <p>Loading summary...</p>;
  if (!summary.labels || summary.labels.length === 0) return <p>No data to summarize</p>;

  const barData = {
    labels: summary.labels,
    datasets: [
      {
        label: 'Expenses by Category',
        data: summary.data,
        backgroundColor: 'rgba(75,192,192,0.6)'
      }
    ]
  };

  const pieData = {
    labels: summary.labels,
    datasets: [
      {
        label: 'Category Share',
        data: summary.data,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
        ]
      }
    ]
  };

  return (
    <div style={{ maxWidth: 900, marginTop: 24 }}>
      <h3>Expense Summary</h3>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
        </div>
      </div>
    </div>
  );
}
