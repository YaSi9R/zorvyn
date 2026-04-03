import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { CATEGORIES, ROLES } from '../../utils/mockData';

const TransactionList = () => {
  const { 
    filteredTransactions, 
    filters, 
    setFilters, 
    role, 
    deleteTransaction 
  } = useFinance();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  
  const displayedTxns = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="card transaction-section">
      <div className="section-header">
        <h3 className="section-title">All Transactions</h3>
        
        <div className="controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search description..." 
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <div className="select-wrapper glass">
              <Filter size={14} className="filter-icon" />
              <select 
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="select-wrapper glass">
              <ArrowUpDown size={14} className="filter-icon" />
              <select 
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
              </select>
            </div>
          </div>

          {role === ROLES.ADMIN && (
            <button className="add-btn flex-center">
              <Plus size={18} />
              <span>Add New</span>
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedTxns.map((txn) => (
              <tr key={txn.id} className="table-row">
                <td>
                  <div className="description-cell">
                    <div className={`type-indicator ${txn.type}`}>
                      {txn.type === 'Income' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    </div>
                    <span>{txn.description}</span>
                  </div>
                </td>
                <td>
                  <span className="category-tag">{txn.category}</span>
                </td>
                <td>{new Date(txn.date).toLocaleDateString()}</td>
                <td className={`amount-cell ${txn.type}`}>
                  {txn.type === 'Income' ? '+' : '-'}${Math.abs(txn.amount).toLocaleString()}
                </td>
                <td>
                  <div className="action-btns">
                    {role === ROLES.ADMIN && (
                      <>
                        <button className="action-btn edit"><Edit3 size={16} /></button>
                        <button className="action-btn delete" onClick={() => deleteTransaction(txn.id)}><Trash2 size={16} /></button>
                      </>
                    )}
                    {role === ROLES.VIEWER && (
                      <button className="action-btn view"><MoreVertical size={16} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <p className="page-info">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} results</p>
        <div className="page-btns">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .transaction-section {
          padding: 0;
          overflow: hidden;
        }

        .section-header {
          padding: var(--space-lg);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--panel-border);
          flex-wrap: wrap;
          gap: var(--space-md);
        }

        .section-title {
          font-size: 1.125rem;
          margin: 0;
        }

        .controls {
          display: flex;
          gap: var(--space-md);
          align-items: center;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          min-width: 250px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-dim);
        }

        .search-box input {
          width: 100%;
          padding: 0.625rem 1rem 0.625rem 2.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--panel-border);
          border-radius: var(--radius-md);
          color: var(--text-main);
          font-size: 0.875rem;
          transition: var(--transition-fast);
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: var(--shadow-glow);
        }

        .filter-group {
          display: flex;
          gap: var(--space-sm);
        }

        .select-wrapper {
          display: flex;
          align-items: center;
          padding: 0 10px;
          border-radius: var(--radius-md);
          gap: 6px;
        }

        .filter-icon {
          color: var(--text-dim);
        }

        .select-wrapper select {
          background: none;
          border: none;
          color: var(--text-main);
          font-size: 0.8125rem;
          padding: 0.625rem 0;
          outline: none;
          cursor: pointer;
        }

        .add-btn {
          padding: 0.625rem 1.25rem;
          background: var(--primary);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.8125rem;
          gap: 8px;
          box-shadow: var(--shadow-glow);
          transition: var(--transition-fast);
        }

        .add-btn:hover {
          transform: scale(1.02);
          opacity: 0.9;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
          text-align: left;
        }

        th {
          padding: var(--space-md) var(--space-lg);
          color: var(--text-dim);
          font-weight: 500;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          border-bottom: 1px solid var(--panel-border);
        }

        td {
          padding: var(--space-md) var(--space-lg);
          border-bottom: 1px solid var(--panel-border);
        }

        .table-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .description-cell {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          font-weight: 500;
        }

        .type-indicator {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .type-indicator.Income { background: rgba(16, 185, 129, 0.1); color: var(--secondary); }
        .type-indicator.Expense { background: rgba(239, 68, 68, 0.1); color: var(--danger); }

        .category-tag {
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .amount-cell {
          font-weight: 600;
          font-family: 'Outfit';
        }

        .amount-cell.Income { color: var(--secondary); }
        .amount-cell.Expense { color: var(--danger); }

        .action-btns {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 6px;
          border-radius: 6px;
          color: var(--text-dim);
          transition: var(--transition-fast);
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
        }

        .action-btn.delete:hover {
          color: var(--danger);
        }

        .pagination {
          padding: var(--space-lg);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-info {
          font-size: 0.8125rem;
          color: var(--text-dim);
        }

        .page-btns {
          display: flex;
          gap: 10px;
        }

        .page-btns button {
          padding: 6px;
          border: 1px solid var(--panel-border);
          border-radius: 6px;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }

        .page-btns button:not(:disabled):hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
        }

        .page-btns button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default TransactionList;
