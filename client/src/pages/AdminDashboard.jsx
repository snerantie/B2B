import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';

export default function AdminDashboard() {
  // Mock data - replace with real API calls
  const platformStats = {
    totalGMV: 'R45,850,000',
    totalCommission: 'R2,292,500',
    averageCommission: '5.0%',
    activeProviders: 287,
    activeBuyers: 1843,
    pendingOrders: 45,
    completedThisMonth: 128,
    monthlyGrowth: '+23.5%'
  };

  const recentTransactions = [
    { id: 1, buyer: 'Shoprite Holdings', provider: 'PayFast SA', amount: 750000, commission: 37500, date: '2 hours ago' },
    { id: 2, buyer: 'Jumia Nigeria', provider: 'Flutterwave', amount: 2200000, commission: 110000, date: '5 hours ago' },
    { id: 3, buyer: 'Safaricom Kenya', provider: 'M-Pesa Integration', amount: 350000, commission: 17500, date: '1 day ago' },
  ];

  const topProviders = [
    { name: 'PayFast South Africa', deals: 45, revenue: 'R18.5M', commission: 'R925K' },
    { name: 'Flutterwave', deals: 38, revenue: 'R12.3M', commission: 'R615K' },
    { name: 'M-Pesa Integration', deals: 32, revenue: 'R8.7M', commission: 'R435K' },
  ];

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Platform Admin Dashboard</h1>
        <p style={{ color: 'var(--gray-600)' }}>Marketplace performance and commission tracking</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Total GMV (All Time)</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{platformStats.totalGMV}</p>
              <p style={{ opacity: 0.8 }}>Gross Merchandise Value</p>
            </div>
            <TrendingUp size={48} style={{ opacity: 0.8 }} />
          </div>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Total Commission Earned</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{platformStats.totalCommission}</p>
              <p style={{ opacity: 0.8 }}>Average: {platformStats.averageCommission} per deal</p>
            </div>
            <DollarSign size={48} style={{ opacity: 0.8 }} />
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>Active Providers</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{platformStats.activeProviders}</p>
              <p style={{ color: 'var(--secondary)', fontWeight: 600 }}>{platformStats.monthlyGrowth} this month</p>
            </div>
            <div style={{
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: '#dbeafe',
              color: 'var(--primary)'
            }}>
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>Active Buyers</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{platformStats.activeBuyers}</p>
              <p style={{ color: 'var(--secondary)', fontWeight: 600 }}>{platformStats.monthlyGrowth} this month</p>
            </div>
            <div style={{
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              color: 'var(--secondary)'
            }}>
              <ShoppingCart size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>Pending Orders</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{platformStats.pendingOrders}</p>
              <p style={{ color: 'var(--gray-600)' }}>Awaiting completion</p>
            </div>
            <div style={{
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: '#fef3c7',
              color: 'var(--warning)'
            }}>
              <Activity size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>Completed This Month</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{platformStats.completedThisMonth}</p>
              <p style={{ color: 'var(--secondary)', fontWeight: 600 }}>+15% vs last month</p>
            </div>
            <div style={{
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              color: 'var(--secondary)'
            }}>
              <ShoppingCart size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Transactions</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--gray-600)' }}>Buyer</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--gray-600)' }}>Provider</th>
                <th style={{ textAlign: 'right', padding: '1rem', color: 'var(--gray-600)' }}>Deal Value</th>
                <th style={{ textAlign: 'right', padding: '1rem', color: 'var(--gray-600)' }}>Commission</th>
                <th style={{ textAlign: 'right', padding: '1rem', color: 'var(--gray-600)' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '1rem' }}>{txn.buyer}</td>
                  <td style={{ padding: '1rem' }}>{txn.provider}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>R{txn.amount.toLocaleString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--secondary)', fontWeight: 600 }}>
                    R{txn.commission.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                    {txn.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Providers */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Top Providers (This Month)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {topProviders.map((provider, index) => (
            <div key={index} style={{
              padding: '1rem',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--border-radius)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ marginBottom: '0.25rem' }}>{provider.name}</h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>{provider.deals} completed deals</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{provider.revenue} in deals</p>
                <p style={{ color: 'var(--secondary)', fontWeight: 600 }}>{provider.commission} commission</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
