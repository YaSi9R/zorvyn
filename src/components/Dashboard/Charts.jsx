import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useFinance } from '../../context/FinanceContext';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899'];

const Charts = () => {
  const { transactions, stats } = useFinance();

  // Prepare area chart data (last 30 days)
  const getChartData = () => {
    const data = {};
    const last30Days = [...Array(30)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    last30Days.forEach(date => {
      data[date] = 0;
    });

    transactions.forEach(t => {
      if (data[t.date] !== undefined) {
        data[t.date] += (t.type === 'Income' ? t.amount : -t.amount);
      }
    });

    let runningBalance = 2500; // Starting base
    return last30Days.map(date => {
      runningBalance += data[date];
      return { 
        date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), 
        balance: runningBalance 
      };
    });
  };

  return (
    <div className="charts-grid">
      <div className="card chart-card main-chart">
        <h3 className="chart-title">Balance Trend (Last 30 Days)</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={getChartData()}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                minTickGap={20}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#151921', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}
                itemStyle={{ color: '#f3f4f6' }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#6366f1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card chart-card pie-chart">
        <h3 className="chart-title">Spending Breakdown</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={stats.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {stats.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
                contentStyle={{ 
                  backgroundColor: '#151921', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style jsx>{`
        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--space-lg);
          margin-bottom: var(--space-xl);
        }

        .chart-card {
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
        }

        .chart-title {
          font-size: 1.125rem;
          margin-bottom: var(--space-lg);
          color: var(--text-main);
        }

        .chart-wrapper {
          flex: 1;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Charts;
