import { useState, useEffect } from 'react';
import { Package, Calendar } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';

export default function Orders() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'badge-warning',
      in_progress: 'badge-primary',
      completed: 'badge-success',
      cancelled: 'badge-danger',
      disputed: 'badge-danger'
    };
    return colors[status] || 'badge-secondary';
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Orders</h1>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
        Track your active and completed engagements
      </p>

      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Package size={64} color="var(--gray-400)" style={{ marginBottom: '1rem' }} />
          <h3>No orders yet</h3>
          <p style={{ color: 'var(--gray-600)' }}>Orders will appear here once you accept a quote</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div key={order.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span className={`badge ${getStatusColor(order.status)}`}>{order.status.replace('_', ' ')}</span>
                    <span className={`badge badge-${order.payment_status === 'paid' ? 'success' : 'warning'}`} style={{ marginLeft: '0.5rem' }}>
                      {order.payment_status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{order.service_name}</h3>
                  <p style={{ color: 'var(--gray-600)' }}>Provider: {order.provider_name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    ${order.total_amount}
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--gray-200)',
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                flexWrap: 'wrap'
              }}>
                {order.start_date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={16} />
                    <span>Started: {new Date(order.start_date).toLocaleDateString()}</span>
                  </div>
                )}
                {order.completion_date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={16} />
                    <span>Completed: {new Date(order.completion_date).toLocaleDateString()}</span>
                  </div>
                )}
                <div style={{ marginLeft: 'auto' }}>
                  Ordered {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
