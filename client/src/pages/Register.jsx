import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import useAuthStore from '../store/authStore';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    country: 'ZA',
    userType: 'buyer', // 'buyer' or 'provider'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', formData);
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '550px', padding: '4rem 1rem' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <UserPlus size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--gray-600)' }}>Join FintechConnect today</p>
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
            <label className="form-label">I am a:</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="userType"
                  value="buyer"
                  checked={formData.userType === 'buyer'}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                Business (Looking for services)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="userType"
                  value="provider"
                  checked={formData.userType === 'provider'}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                Service Provider
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
              placeholder="Acme Inc."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Country</label>
            <select
              className="form-input"
              value={formData.country || 'ZA'}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            >
              <option value="ZA">🇿🇦 South Africa</option>
              <option value="NG">🇳🇬 Nigeria</option>
              <option value="KE">🇰🇪 Kenya</option>
              <option value="GH">🇬🇭 Ghana</option>
              <option value="EG">🇪🇬 Egypt</option>
              <option value="MA">🇲🇦 Morocco</option>
              <option value="TZ">🇹🇿 Tanzania</option>
              <option value="UG">🇺🇬 Uganda</option>
              <option value="ET">🇪🇹 Ethiopia</option>
              <option value="RW">🇷🇼 Rwanda</option>
              <option value="SN">🇸🇳 Senegal</option>
              <option value="CI">🇨🇮 Côte d'Ivoire</option>
              <option value="ZM">🇿🇲 Zambia</option>
              <option value="ZW">🇿🇼 Zimbabwe</option>
              <option value="BW">🇧🇼 Botswana</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="you@company.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="At least 8 characters"
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              placeholder="Repeat your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--gray-600)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
