import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialTransactions, ROLES } from '../utils/mockData';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('zorvyn_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  
  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('zorvyn_role');
    return saved || ROLES.ADMIN;
  });

  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    type: 'All',
    sortBy: 'date-desc',
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('zorvyn_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('zorvyn_role', role);
  }, [role]);

  const addTransaction = (transaction) => {
    if (role !== ROLES.ADMIN) return;
    setTransactions((prev) => [
      { ...transaction, id: `txn-${Date.now()}` },
      ...prev
    ]);
  };

  const deleteTransaction = (id) => {
    if (role !== ROLES.ADMIN) return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (id, updatedTxn) => {
    if (role !== ROLES.ADMIN) return;
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedTxn } : t)));
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'All' || t.category === filters.category;
        const matchesType = filters.type === 'All' || t.type === filters.type;
        return matchesSearch && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (filters.sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (filters.sortBy === 'amount-desc') return b.amount - a.amount;
        if (filters.sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [transactions, filters]);

  const stats = useMemo(() => {
    const totalBalance = transactions.reduce((acc, t) => (t.type === 'Income' ? acc + t.amount : acc - t.amount), 0);
    const totalIncome = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
    
    // Grouping by category
    const categoryBreakdown = transactions
      .filter(t => t.type === 'Expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const sortedCategories = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories[0]?.[0] || 'N/A';

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      topCategory,
      categoryData: Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value })),
    };
  }, [transactions]);

  const value = {
    transactions,
    filteredTransactions,
    role,
    setRole,
    filters,
    setFilters,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    stats,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};
