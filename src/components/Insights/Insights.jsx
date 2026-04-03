import React from 'react';
import { 
  Zap, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const InsightCard = ({ title, description, icon: Icon, color, value }) => (
  <div className="card insight-card">
    <div className={`insight-icon flex-center ${color}`}>
      <Icon size={24} />
    </div>
    <div className="insight-content">
      <div className="insight-title-group">
        <h4 className="insight-title">{title}</h4>
        {value && <span className={`insight-value ${color}`}>{value}</span>}
      </div>
      <p className="insight-desc">{description}</p>
    </div>
    <style jsx>{`
      .insight-card {
        display: flex;
        gap: var(--space-lg);
        align-items: flex-start;
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .insight-icon {
        width: 48px;
        height: 48px;
        min-width: 48px;
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.03);
      }

      .insight-icon.purple { color: #a855f7; background: rgba(168, 85, 247, 0.1); }
      .insight-icon.green { color: #10b981; background: rgba(16, 185, 129, 0.1); }
      .insight-icon.orange { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
      .insight-icon.blue { color: #3b82f6; background: rgba(59, 130, 246, 0.1); }

      .insight-content {
        flex: 1;
      }

      .insight-title-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
      }

      .insight-title {
        font-size: 1rem;
        margin: 0;
      }

      .insight-value {
        font-weight: 700;
        font-size: 1.125rem;
        font-family: 'Outfit';
      }

      .insight-value.purple { color: #a855f7; }
      .insight-value.green { color: #10b981; }

      .insight-desc {
        color: var(--text-dim);
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 0;
      }
    `}</style>
  </div>
);

const Insights = () => {
  const { stats } = useFinance();

  const insightsData = [
    {
      title: "Top Spending Category",
      description: `Your highest expenditure this month is on ${stats.topCategory}. Consider setting a budget for this category.`,
      icon: Target,
      color: "purple",
      value: stats.topCategory
    },
    {
      title: "Savings Opportunity",
      description: "You've spent 15% more on entertainment than last month. Cutting back could save you ~$150 monthly.",
      icon: Lightbulb,
      color: "orange"
    },
    {
      title: "Monthly Progress",
      description: "Great job! Your total income has exceeded your expenses by 22% so far this month.",
      icon: TrendingUp,
      color: "green",
      value: "22%"
    },
    {
      title: "Subscription Alert",
      description: "We noticed 4 recurring subscription payments this week. Are you still using all of these services?",
      icon: AlertCircle,
      color: "blue"
    }
  ];

  return (
    <div className="insights-container">
      <div className="insights-header flex-center">
        <Zap size={20} className="text-gradient" />
        <h3 className="section-title">Smart Insights</h3>
      </div>
      
      <div className="insights-grid">
        {insightsData.map((item, idx) => (
          <InsightCard key={idx} {...item} />
        ))}
      </div>

      <style jsx>{`
        .insights-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .insights-header {
          gap: 10px;
          justify-content: flex-start;
          margin-bottom: var(--space-xs);
        }

        .section-title {
          font-size: 1.25rem;
          margin: 0;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--space-lg);
        }

        @media (max-width: 640px) {
          .insights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Insights;
