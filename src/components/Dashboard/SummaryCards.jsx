import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const SummaryCard = ({ title, amount, icon: Icon, trend, color }) => (
  <div className="card summary-card">
    <div className="card-header">
      <div className={`icon-wrapper flex-center ${color}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <div className={`trend ${trend > 0 ? 'up' : 'down'}`}>
          {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <div className="card-body">
      <p className="card-label">{title}</p>
      <h3 className="card-value">${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
    </div>
    <style jsx>{`
      .summary-card {
        flex: 1;
        min-width: 240px;
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .icon-wrapper {
        width: 42px;
        height: 42px;
        border-radius: var(--radius-md);
      }

      .icon-wrapper.primary { background: rgba(99, 102, 241, 0.1); color: var(--primary); }
      .icon-wrapper.success { background: rgba(16, 185, 129, 0.1); color: var(--secondary); }
      .icon-wrapper.danger { background: rgba(239, 68, 68, 0.1); color: var(--danger); }

      .trend {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: var(--radius-full);
      }

      .trend.up { background: rgba(16, 185, 129, 0.1); color: var(--secondary); }
      .trend.down { background: rgba(239, 68, 68, 0.1); color: var(--danger); }

      .card-label {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin-bottom: 4px;
      }

      .card-value {
        font-size: 1.5rem;
        letter-spacing: -0.5px;
      }
    `}</style>
  </div>
);

const SummaryCards = () => {
  const { stats } = useFinance();

  return (
    <div className="summary-grid">
      <SummaryCard 
        title="Total Balance" 
        amount={stats.totalBalance} 
        icon={DollarSign} 
        color="primary" 
        trend={2.4} 
      />
      <SummaryCard 
        title="Total Income" 
        amount={stats.totalIncome} 
        icon={TrendingUp} 
        color="success" 
        trend={12.5} 
      />
      <SummaryCard 
        title="Total Expenses" 
        amount={stats.totalExpense} 
        icon={TrendingDown} 
        color="danger" 
        trend={-8.1} 
      />
      <style jsx>{`
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-lg);
          margin-bottom: var(--space-xl);
        }
      `}</style>
    </div>
  );
};

export default SummaryCards;
