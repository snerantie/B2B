import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Building2, Menu, User, LogOut, MessageSquare, FileText, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../store/authStore';

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <nav className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '1rem'
        }}>
          {/* Logo */}
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--primary)'
          }}>
            <Building2 size={32} />
            <span>FintechConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/services" style={{ fontWeight: 500 }}>Browse Services</Link>
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <LayoutDashboard size={20} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  Dashboard
                </Link>
                <Link to="/rfq">
                  <FileText size={20} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  RFQs
                </Link>
                <Link to="/messages">
                  <MessageSquare size={20} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  Messages
                </Link>
                <div style={{ position: 'relative' }}>
                  <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--gray-100)',
                      borderRadius: 'var(--border-radius)'
                    }}
                  >
                    <User size={20} />
                    <span>{user.name}</span>
                  </button>
                  
                  {menuOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      marginTop: '0.5rem',
                      backgroundColor: 'white',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      minWidth: '200px',
                      zIndex: 100
                    }}>
                      <Link 
                        to="/dashboard" 
                        style={{ 
                          display: 'block', 
                          padding: '0.75rem 1rem',
                          borderBottom: '1px solid var(--gray-200)'
                        }}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          padding: '0.75rem 1rem',
                          textAlign: 'left',
                          color: 'var(--danger)'
                        }}
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--gray-800)',
        color: 'white',
        padding: '3rem 0',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>FintechConnect</h3>
              <p style={{ color: 'var(--gray-400)' }}>
                Connecting businesses with trusted financial service providers.
              </p>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '1rem' }}>For Buyers</h4>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link to="/services" style={{ color: 'var(--gray-400)' }}>Browse Services</Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link to="/rfq/create" style={{ color: 'var(--gray-400)' }}>Request a Quote</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '1rem' }}>For Providers</h4>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link to="/register" style={{ color: 'var(--gray-400)' }}>Become a Provider</Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link to="/dashboard" style={{ color: 'var(--gray-400)' }}>Provider Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '3rem', 
            paddingTop: '2rem', 
            borderTop: '1px solid var(--gray-700)',
            textAlign: 'center',
            color: 'var(--gray-400)'
          }}>
            <p>&copy; 2026 FintechConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
