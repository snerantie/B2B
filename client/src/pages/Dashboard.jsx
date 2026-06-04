import { FileText, MessageSquare, ShoppingCart, TrendingUp } from 'lucide-react';
import useAuthStore from '../store/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Active RFQs', value: '12', icon: <FileText size={24} />, color: '#2563eb' },
    { label: 'Pending Quotes', value: '8', icon: <TrendingUp size={24} />, color: '#10b981' },
    { label: 'Messages', value: '24', icon: <MessageSquare size={24} />, color: '#f59e0b' },
    { label: 'Active Orders', value: '5', icon: <ShoppingCart size={24} />, color: '#8b5cf6' },
  ];

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Welcome back, {user?.name}!
        </h1>
        <p style={{ color: 'var(--gray-600)' }}>
          {user?.userType === 'provider' ? 'Manage your services and respond to RFQs' : 'Track your requests and connect with providers'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
        {stats.map((stat, index) => (
          <div key={index} className="card" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>{stat.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</p>
            </div>
            <div style={{
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: `${stat.color}20`,
              color: stat.color
            }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--primary)'
          }}>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>New quote received</p>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Payment Gateway Integration - 2 hours ago</p>
          </div>
          
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--secondary)'
          }}>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>RFQ submitted successfully</p>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Risk Assessment Services - Yesterday</p>
          </div>
          
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--warning)'
          }}>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>New message from provider</p>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>FinanceX Solutions - 2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
