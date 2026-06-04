import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, MessageSquare } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';

export default function RFQDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [rfq, setRfq] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const [quoteData, setQuoteData] = useState({
    price: '',
    delivery_time: '',
    proposal: '',
    terms: { payment: '50% upfront, 50% on completion', support: '30 days included' }
  });

  useEffect(() => {
    fetchRFQData();
  }, [id]);

  const fetchRFQData = async () => {
    try {
      const [rfqRes, quotesRes] = await Promise.all([
        axios.get(`/api/rfqs/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`/api/quotes/rfq/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setRfq(rfqRes.data);
      setQuotes(quotesRes.data);
    } catch (error) {
      console.error('Error fetching RFQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/quotes', { ...quoteData, rfq_id: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowQuoteForm(false);
      fetchRFQData();
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;
  if (!rfq) return <div className="container" style={{ padding: '2rem' }}>RFQ not found</div>;

  const requirements = rfq.requirements ? JSON.parse(rfq.requirements) : {};

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <button onClick={() => navigate('/rfq')} className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span className={`badge badge-${rfq.status === 'open' ? 'success' : 'secondary'}`}>{rfq.status}</span>
          <span className="badge badge-primary" style={{ marginLeft: '0.5rem' }}>{rfq.category}</span>
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{rfq.title}</h1>
        {user?.userType === 'provider' && <p style={{ color: 'var(--gray-600)' }}>Posted by: {rfq.buyer_company}</p>}
        <p style={{ color: 'var(--gray-700)', lineHeight: '1.6', marginTop: '1rem' }}>{rfq.description}</p>
        
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {rfq.budget && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign size={18} />
              <span>Budget: ${rfq.budget}</span>
            </div>
          )}
          {rfq.deadline && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} />
              <span>Deadline: {new Date(rfq.deadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      {user?.userType === 'provider' && rfq.status === 'open' && !showQuoteForm && (
        <button onClick={() => setShowQuoteForm(true)} className="btn btn-primary" style={{ marginBottom: '2rem' }}>
          Submit Quote
        </button>
      )}

      {showQuoteForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Submit Your Quote</h2>
          <form onSubmit={handleSubmitQuote}>
            <div className="form-group">
              <label className="form-label">Price (USD) *</label>
              <input type="number" className="form-input" value={quoteData.price}
                onChange={(e) => setQuoteData({ ...quoteData, price: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Time *</label>
              <input type="text" className="form-input" value={quoteData.delivery_time}
                onChange={(e) => setQuoteData({ ...quoteData, delivery_time: e.target.value })}
                placeholder="e.g., 2-3 weeks" required />
            </div>
            <div className="form-group">
              <label className="form-label">Proposal *</label>
              <textarea className="form-input form-textarea" value={quoteData.proposal}
                onChange={(e) => setQuoteData({ ...quoteData, proposal: e.target.value })}
                rows={6} required />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary">Submit Quote</button>
              <button type="button" onClick={() => setShowQuoteForm(false)} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Quotes ({quotes.length})</h2>
      {quotes.length === 0 ? (
        <div className="card"><p>No quotes yet.</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {quotes.map((quote) => (
            <div key={quote.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3>{quote.provider_name}</h3>
                  <p style={{ color: 'var(--gray-600)', margin: '0.5rem 0' }}>⏱️ {quote.delivery_time}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>${quote.price}</div>
                  <span className={`badge badge-${quote.status === 'submitted' ? 'warning' : 'success'}`}>{quote.status}</span>
                </div>
              </div>
              <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{quote.proposal}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
