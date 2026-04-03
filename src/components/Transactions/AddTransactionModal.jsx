import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { CATEGORIES, TRANSACTION_TYPES } from '../../utils/mockData';

const AddTransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: CATEGORIES[0],
    type: 'Expense',
    date: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setFormData({
      description: '',
      amount: '',
      category: CATEGORIES[0],
      type: 'Expense',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="modal-overlay flex-center">
      <div className="modal-content card animate-fade-in">
        <div className="modal-header">
          <h3>Add New Transaction</h3>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description</label>
            <input 
              required 
              type="text" 
              placeholder="e.g. Weekly Groceries"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount ($)</label>
              <input 
                required 
                type="number" 
                step="0.01" 
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input 
                required 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                {TRANSACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn flex-center">
            Save Transaction
          </button>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1000;
          padding: var(--space-md);
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          padding: 0;
          overflow: hidden;
        }

        .modal-header {
          padding: var(--space-lg);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--panel-border);
        }

        .close-btn {
          color: var(--text-dim);
          transition: var(--transition-fast);
        }

        .close-btn:hover { color: var(--text-main); }

        form { padding: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-md); }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }

        .form-group { display: flex; flex-direction: column; gap: 6px; }

        label { font-size: 0.75rem; color: var(--text-dim); font-weight: 600; text-transform: uppercase; }

        input, select {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--panel-border);
          border-radius: 8px;
          color: var(--text-main);
          font-size: 0.875rem;
          outline: none;
        }

        input:focus { border-color: var(--primary); }

        .submit-btn {
          margin-top: var(--space-md);
          padding: 1rem;
          background: var(--grad-primary);
          color: white;
          font-weight: 700;
          border-radius: 8px;
          box-shadow: var(--shadow-glow);
          transition: var(--transition-base);
        }

        .submit-btn:hover { transform: scale(1.02); filter: brightness(1.1); }
      `}</style>
    </div>
  );
};

export default AddTransactionModal;
