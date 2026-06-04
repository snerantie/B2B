import { Link } from 'react-router-dom';
import { Search, Shield, Zap, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Mobile Money Integration', count: 52, icon: '📱' },
    { name: 'Payment Processing', count: 45, icon: '💳' },
    { name: 'Lending & Microfinance', count: 38, icon: '💰' },
    { name: 'Compliance & KYC', count: 41, icon: '✓' },
    { name: 'Cross-Border Payments', count: 34, icon: '🌍' },
    { name: 'Financial Inclusion Tech', count: 29, icon: '📊' },
  ];

  const features = [
    {
      icon: <Search size={40} color="var(--primary)" />,
      title: 'Connect Buyers & Sellers',
      description: 'We connect businesses with verified financial service providers - we don\'t provide services ourselves'
    },
    {
      icon: <Shield size={40} color="var(--primary)" />,
      title: 'Verified Marketplace',
      description: 'All providers are vetted with compliance certifications. We ensure quality through verification, not provision'
    },
    {
      icon: <Zap size={40} color="var(--primary)" />,
      title: 'Compare Quotes',
      description: 'Post one RFQ and get multiple competitive quotes. Compare and choose the best provider for your needs'
    },
    {
      icon: <Users size={40} color="var(--primary)" />,
      title: 'Transparent Platform',
      description: 'Direct negotiation between buyer and seller. We facilitate connections and take a small commission on successful deals'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            Africa's Premier B2B Financial Services Marketplace
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Connecting South African and African businesses with trusted fintech and financial service providers
          </p>
          <div style={{ fontSize: '1rem', marginBottom: '2rem', opacity: 0.85 }}>
            🇿🇦 Serving South Africa, Nigeria, Kenya, Ghana, Egypt & across Africa
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/services" className="btn" style={{
              backgroundColor: 'white',
              color: 'var(--primary)',
              fontSize: '1.1rem',
              padding: '1rem 2rem'
            }}>
              Browse Services
            </Link>
            <Link to="/register" className="btn" style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              fontSize: '1.1rem',
              padding: '1rem 2rem'
            }}>
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>
            Popular Service Categories
          </h2>
          <div className="grid grid-3">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to="/services"
                className="card"
                style={{ textAlign: 'center', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{category.icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{category.name}</h3>
                <p style={{ color: 'var(--gray-600)' }}>{category.count} providers</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ backgroundColor: 'var(--gray-100)', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>
            How It Works
          </h2>
          <div className="grid grid-2">
            {features.map((feature, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--gray-600)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>300+</div>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>African Service Providers</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>2,400+</div>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>Businesses Across Africa</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>15</div>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>African Countries</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>R850M+</div>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>Contracts Facilitated</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'var(--primary)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join thousands of businesses finding their ideal financial partners
          </p>
          <Link to="/register" className="btn" style={{
            backgroundColor: 'white',
            color: 'var(--primary)',
            fontSize: '1.1rem',
            padding: '1rem 2.5rem'
          }}>
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
