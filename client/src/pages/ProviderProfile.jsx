import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Building2, Mail, Globe, Award, Star, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function ProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviderData();
  }, [id]);

  const fetchProviderData = async () => {
    try {
      const [providerRes, servicesRes] = await Promise.all([
        axios.get(`/api/providers/${id}`),
        axios.get(`/api/services?provider_id=${id}`)
      ]);
      setProvider(providerRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      console.error('Error fetching provider:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;
  }

  if (!provider) {
    return <div className="container" style={{ padding: '2rem' }}>Provider not found</div>;
  }

  const certifications = provider.certifications ? JSON.parse(provider.certifications) : {};

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      {/* Provider Header */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'start', flexWrap: 'wrap' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold'
          }}>
            {provider.company_name.charAt(0)}
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>{provider.company_name}</h1>
              {provider.is_verified && (
                <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle size={16} />
                  Verified
                </span>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Star size={20} color="#f59e0b" fill="#f59e0b" />
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{provider.rating}</span>
              <span style={{ color: 'var(--gray-600)' }}>({provider.total_reviews} reviews)</span>
            </div>
            
            <p style={{ color: 'var(--gray-700)', marginBottom: '1rem', lineHeight: '1.6' }}>
              {provider.description}
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)' }}>
                <Mail size={18} />
                <span>{provider.email}</span>
              </div>
              {provider.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)' }}>
                  <Globe size={18} />
                  <a href={provider.website} target="_blank" rel="noopener noreferrer">
                    {provider.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      {Object.keys(certifications).length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={24} color="var(--primary)" />
            Certifications & Compliance
          </h2>
          <div className="grid grid-3">
            {Object.entries(certifications).map(([cert, value]) => (
              <div key={cert} className="badge badge-primary" style={{ padding: '0.75rem 1rem', fontSize: '1rem' }}>
                <strong>{cert}:</strong> {value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services */}
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Services Offered</h2>
        {services.length === 0 ? (
          <p style={{ color: 'var(--gray-600)' }}>No services listed yet.</p>
        ) : (
          <div className="grid grid-2">
            {services.map((service) => (
              <div key={service.id} className="card">
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="badge badge-primary">{service.category}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{service.name}</h3>
                <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>{service.description}</p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--gray-200)'
                }}>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {service.pricing_type === 'custom' ? 'Custom Pricing' : `From $${service.base_price}`}
                  </span>
                  {service.delivery_time && (
                    <span style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                      ⏱️ {service.delivery_time}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
