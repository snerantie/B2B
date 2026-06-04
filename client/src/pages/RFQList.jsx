import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Calendar, DollarSign } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';

export default function RFQList() {
  const { user, token } = useAuthStore();
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRFQs();
  }, []);

  const fetchRFQs = async () => {
    try {
      const response = await axios.get('/api/rfqs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRfqs(response.data);
    } catch (error) {
      console.error('Error fetching RFQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRFQs = rfqs.filter(rfq => {
    if (filter === 'all') return true;
    return rfq.status === filter;
  });

  const getStatusColor = (status) => {
    const colors = {
      open: 'badge-success',
      closed: 'badge-secondary',
      awarded: 'badge-primary',
      cancelled: 'badge-danger'
    };
    return colors[status] || 'badge-secondary';
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {user?.userType === 'provider' ? 'Available RFQs' : 'My RFQs'}
          </h1>
          <p style={{ color: 'var(--gray-600)' }}>
            {user?.userType === 'provider' 
              ? 'Browse and respond to requests for quotes' 
              : 'Track your service requests and quotes'}
          </p>
        </div>
        
        {user?.userType === 'buyer' && (
          <Link to="/rfq/create" className="btn btn-primary">
            <Plus size={20} />
            Create RFQ
          </Link>
        )}
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {['all', 'open', 'closed', 'awarded'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className="btn"
            style={{
              backgroundColor: filter === status ? 'var(--primary)' : 'var(--gray-200)',
              color: filter === status ? 'white' : 'var(--gray-800)'
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* RFQ List */}
      {loading ? (
        <div>Loading...</div>
      ) : filteredRFQs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <FileText size={64} color="var(--gray-400)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>No RFQs found</h3>
          <p style={{ color: 'var(--gray-600)' }}>
            {user?.userType === 'buyer' 
              ? 'Create your first RFQ to get started' 
              : 'Check back later for new opportunities'}
          </p>
        </div>
      ) : (
        <div className="grid" style={{ gap: '1.5rem' }}>
          {filteredRFQs.map((rfq) => (
            <Link key={rfq.id} to={`/rfq/${rfq.id}`} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <span className={`badge ${getStatusColor(rfq.status)}`}>
                      {rfq.status}
                    </span>
                    <span className="badge badge-primary">{rfq.category}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{rfq.title}</h3>
                  {user?.userType === 'provider' && rfq.buyer_company && (
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                      by {rfq.buyer_company}
                    </p>
                  )}
                </div>
                {rfq.quote_count > 0 && user?.userType === 'buyer' && (
                  <span className="badge badge-warning">
                    {rfq.quote_count} {rfq.quote_count === 1 ? 'quote' : 'quotes'}
                  </span>
                )}
              </div>
              
              <p style={{ color: 'var(--gray-700)', marginBottom: '1rem', lineHeight: '1.6' }}>
                {rfq.description.length > 200 
                  ? `${rfq.description.substring(0, 200)}...` 
                  : rfq.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--gray-200)',
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                flexWrap: 'wrap'
              }}>
                {rfq.budget && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <DollarSign size={16} />
                    <span>Budget: ${rfq.budget}</span>
                  </div>
                )}
                {rfq.deadline && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={16} />
                    <span>Deadline: {new Date(rfq.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                <div style={{ marginLeft: 'auto' }}>
                  Posted {formatDistanceToNow(new Date(rfq.created_at), { addSuffix: true })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
