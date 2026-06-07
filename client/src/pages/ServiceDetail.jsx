import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Star, Building2, MessageSquare, FileText } from 'lucide-react';
import { getServiceById } from '../data/services';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id);

  if (!service) {
    return (
      <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>Service not found</h1>
        <Link to="/services" className="btn btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <button onClick={() => navigate('/services')} className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={20} />
        Back to Catalog
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Main content */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              {service.category}
            </span>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{service.name}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building2 size={18} /> {service.provider}
              </span>
              <span>{service.country}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Star size={18} color="#f59e0b" fill="#f59e0b" /> {service.rating}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={18} /> {service.deliveryTime}
              </span>
            </div>
            <p style={{ color: 'var(--gray-700)', lineHeight: 1.7 }}>{service.description}</p>
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>What's included</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {service.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={18} color="var(--secondary)" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / CTA */}
        <div className="card" style={{ position: 'sticky', top: '90px' }}>
          <p style={{ color: 'var(--gray-600)', marginBottom: '0.25rem' }}>Starting price</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1.5rem' }}>
            {service.price}
          </p>

          <Link to="/rfq/create" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <FileText size={18} />
            Request a Quote
          </Link>
          <Link to="/messages" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            <MessageSquare size={18} />
            Contact Provider
          </Link>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-200)', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <CheckCircle size={16} color="var(--secondary)" /> Verified provider
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} color="var(--secondary)" /> Secure messaging & quotes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
