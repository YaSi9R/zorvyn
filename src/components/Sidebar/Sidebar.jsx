import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  LineChart, 
  LogOut, 
  Menu, 
  X,
  CreditCard,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { ROLES } from '../../utils/mockData';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { role, setRole } = useFinance();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'insights', label: 'Insights', icon: LineChart },
  ];

  const handleRoleToggle = () => {
    setRole(role === ROLES.ADMIN ? ROLES.VIEWER : ROLES.ADMIN);
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar glass ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon flex-center">
              <CreditCard size={20} color="white" />
            </div>
            <span className="logo-text">Zorvyn<span className="text-muted">Finance</span></span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} className="nav-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="role-switcher card">
            <div className="role-info">
              {role === ROLES.ADMIN ? <ShieldCheck size={16} /> : <Eye size={16} />}
              <span>{role} Mode</span>
            </div>
            <button className="toggle-btn" onClick={handleRoleToggle}>
              Switch to {role === ROLES.ADMIN ? 'Viewer' : 'Admin'}
            </button>
          </div>
          
          <button className="nav-item logout">
            <LogOut size={20} className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: var(--space-lg);
          transition: var(--transition-base);
          z-index: 100;
          border-right: 1px solid var(--panel-border);
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar-header {
          margin-bottom: var(--space-xl);
          padding-left: var(--space-sm);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--grad-primary);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-glow);
        }

        .logo-text {
          font-family: 'Outfit';
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.5px;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: 0.875rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-muted);
          font-weight: 500;
          transition: var(--transition-fast);
        }

        .nav-item:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          color: white;
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          box-shadow: var(--shadow-sm);
        }

        .nav-icon {
          transition: var(--transition-fast);
        }

        .nav-item.active .nav-icon {
          color: var(--primary);
        }

        .sidebar-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .role-switcher {
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          background: rgba(255, 255, 255, 0.03);
        }

        .role-info {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: 0.75rem;
          color: var(--primary);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .toggle-btn {
          font-size: 0.75rem;
          color: var(--text-dim);
          text-decoration: underline;
          text-align: left;
        }

        .toggle-btn:hover {
          color: var(--text-main);
        }

        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: var(--space-md);
          left: var(--space-md);
          z-index: 101;
          padding: var(--space-xs);
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          border-radius: var(--radius-sm);
          color: var(--text-main);
        }

        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex;
          }
          .sidebar.closed {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
