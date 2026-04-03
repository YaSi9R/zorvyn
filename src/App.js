import React, { useState } from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import Sidebar from './components/Sidebar/Sidebar';
import SummaryCards from './components/Dashboard/SummaryCards';
import Charts from './components/Dashboard/Charts';
import TransactionList from './components/Transactions/TransactionList';
import Insights from './components/Insights/Insights';
import AddTransactionModal from './components/Transactions/AddTransactionModal';
import { Plus } from 'lucide-react';
import { ROLES } from './utils/mockData';
import './index.css';

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role } = useFinance();

  return (
    <div className="layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <header className="content-inner top-bar">
          <div className="welcome">
            <h1 className="font-heading">Financial Overview</h1>
            <p className="text-muted">Welcome back, here's what's happening with your money.</p>
          </div>
          
          {role === ROLES.ADMIN && (
            <button className="fab-btn flex-center" onClick={() => setIsModalOpen(true)}>
              <Plus size={24} />
            </button>
          )}
        </header>

        <div className="content-inner scrollable-area">
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <SummaryCards />
              <Charts />
              <div className="bottom-row">
                <TransactionList />
                <Insights />
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="animate-fade-in">
              <TransactionList />
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="animate-fade-in">
              <Insights />
            </div>
          )}
        </div>
      </main>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05) 0%, transparent 40%);
        }

        .top-bar {
          padding: var(--space-xl) var(--space-xl) var(--space-lg);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid transparent;
        }

        .welcome h1 {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .welcome p {
          font-size: 0.875rem;
        }

        .content-inner {
          padding-left: var(--space-xl);
          padding-right: var(--space-xl);
        }

        .scrollable-area {
          flex: 1;
          overflow-y: auto;
          padding-top: var(--space-md);
          padding-bottom: var(--space-xl);
        }

        .bottom-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: var(--space-xl);
        }

        .fab-btn {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          background: var(--grad-primary);
          color: white;
          box-shadow: 0 8px 16px var(--primary-glow);
          transition: var(--transition-base);
          position: fixed;
          bottom: 2rem;
          right: 2.5rem;
          z-index: 90;
        }

        .fab-btn:hover {
          transform: translateY(-4px) rotate(90deg);
          box-shadow: 0 12px 24px var(--primary-glow);
        }

        @media (max-width: 1024px) {
          .main-content {
            margin-left: 0;
          }
          .top-bar {
            padding: 5rem var(--space-md) var(--space-lg);
          }
          .content-inner {
            padding-left: var(--space-md);
            padding-right: var(--space-md);
          }
          .bottom-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  return (
    <FinanceProvider>
      <DashboardContent />
    </FinanceProvider>
  );
};

export default App;
