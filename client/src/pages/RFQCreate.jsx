import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';

export default function RFQCreate() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Mobile Money Integration',
    budget: '',
    currency: 'ZAR',
    deadline: '',
    countries: ['ZA'],
    requirements: {
      urgency: 'normal',
      complexity: 'medium',
      support_needed: true,
      multi_currency: false,
      regulatory_compliance: true
    }
  });

  const categories = [
    'Mobile Money Integration',
    'Payment Processing',
    'Lending & Microfinance',
    'Compliance & KYC (FICA)',
    'Cross-Border Payments',
    'Financial Inclusion Tech',
    'Islamic Finance (Shariah)',
    'Remittance Services',
    'USSD Banking',
    'Agent Banking Solutions',
    'Digital Wallets',
    'Treasury Management',
    'Risk Management',
    'Financial Analytics'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/api/rfqs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/rfq');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create RFQ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
      <button 
        onClick={() => navigate('/rfq')}
        className="btn btn-secondary"
        style={{ marginBottom: '1.5rem' }}
      >
        <ArrowLeft size={20} />
        Back to RFQs
      </button>

      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <FileText size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Request for Quote</h1>
          <p style={{ color: 'var(--gray-600)' }}>
            Describe your service requirements and get quotes from providers
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: 'var(--border-radius)',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="E.g., Payment Gateway Integration for E-commerce"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-input"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-input form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Describe your requirements in detail..."
              rows={6}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Budget (USD)</label>
              <input
                type="number"
                className="form-input"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="Optional"
                min="0"
                step="100"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Deadline</label>
              <input
                type="date"
                className="form-input"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Urgency</label>
            <select
              className="form-input"
              value={formData.requirements.urgency}
              onChange={(e) => setFormData({ 
                ...formData, 
                requirements: { ...formData.requirements, urgency: e.target.value }
              })}
            >
              <option value="low">Low - Can wait</option>
              <option value="normal">Normal - Standard timeline</option>
              <option value="high">High - Need soon</option>
              <option value="urgent">Urgent - ASAP</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Project Complexity</label>
            <select
              className="form-input"
              value={formData.requirements.complexity}
              onChange={(e) => setFormData({ 
                ...formData, 
                requirements: { ...formData.requirements, complexity: e.target.value }
              })}
            >
              <option value="simple">Simple - Straightforward requirements</option>
              <option value="medium">Medium - Some customization needed</option>
              <option value="complex">Complex - Significant customization</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.requirements.support_needed}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  requirements: { ...formData.requirements, support_needed: e.target.checked }
                })}
                style={{ marginRight: '0.5rem' }}
              />
              <span>Ongoing support required after implementation</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Creating RFQ...' : 'Submit RFQ'}
          </button>
        </form>
      </div>
    </div>
  );
}
