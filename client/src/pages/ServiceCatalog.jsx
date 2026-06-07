import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function ServiceCatalog() {

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Service Catalog</h1>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
        Browse and compare financial services from verified providers
      </p>

      {/* Search and Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--gray-400)'
            }} 
          />
          <input
            type="text"
            placeholder="Search services..."
            className="form-input"
            style={{ paddingLeft: '3rem' }}
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-2">
        {services.map((service) => (
          <Link key={service.id} to={`/services/${service.id}`} className="card">
            <div style={{ marginBottom: '1rem' }}>
              <span className="badge badge-primary">{service.category}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{service.name}</h3>
            <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>by {service.provider}</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>{service.country}</p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid var(--gray-200)'
            }}>
              <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{service.price}</span>
              <span>⭐ {service.rating}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
