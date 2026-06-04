-- B2B Financial Services Marketplace Database Schema

-- Users table (both buyers and providers)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('buyer', 'provider')),
  country VARCHAR(2) NOT NULL DEFAULT 'ZA', -- ISO country code
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Providers table (extended info for service providers)
CREATE TABLE IF NOT EXISTS providers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description TEXT,
  services TEXT[], -- Array of service categories
  certifications JSONB, -- JSON of certifications/compliance
  website VARCHAR(255),
  is_verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services catalog
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  pricing_type VARCHAR(50) CHECK (pricing_type IN ('fixed', 'hourly', 'custom', 'tiered')),
  base_price DECIMAL(10,2),
  pricing_details JSONB, -- For complex pricing structures
  delivery_time VARCHAR(100),
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RFQs (Request for Quotations)
CREATE TABLE IF NOT EXISTS rfqs (
  id SERIAL PRIMARY KEY,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  requirements JSONB, -- Detailed requirements
  budget DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'ZAR', -- ZAR, NGN, KES, etc.
  countries TEXT[], -- Target countries for service
  deadline DATE,
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'closed', 'awarded', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotes (responses to RFQs)
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  rfq_id INTEGER REFERENCES rfqs(id) ON DELETE CASCADE,
  provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
  service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
  price DECIMAL(10,2) NOT NULL,
  delivery_time VARCHAR(100),
  proposal TEXT NOT NULL,
  terms JSONB, -- Payment terms, milestones, etc.
  status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'accepted', 'rejected', 'expired')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders/Engagements
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
  quote_id INTEGER REFERENCES quotes(id) ON DELETE SET NULL,
  service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) DEFAULT 0.00, -- Commission for marketplace
  platform_fee_percentage DECIMAL(5,2) DEFAULT 5.00, -- Default 5% commission
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'disputed')),
  payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded')),
  payment_method VARCHAR(50), -- Direct between parties, escrow, etc.
  start_date DATE,
  completion_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  user1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rfq_id INTEGER REFERENCES rfqs(id) ON DELETE SET NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user1_id, user2_id)
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews/Ratings
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  reviewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platform Analytics (track marketplace performance)
CREATE TABLE IF NOT EXISTS platform_analytics (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  total_rfqs INTEGER DEFAULT 0,
  total_quotes INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  total_gmv DECIMAL(12,2) DEFAULT 0.00, -- Gross Merchandise Value
  total_commission DECIMAL(12,2) DEFAULT 0.00,
  active_buyers INTEGER DEFAULT 0,
  active_providers INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date)
);

-- Subscription Plans (for premium provider listings)
CREATE TABLE IF NOT EXISTS subscription_plans (
  id SERIAL PRIMARY KEY,
  provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) CHECK (plan_type IN ('free', 'basic', 'professional', 'enterprise')),
  price_per_month DECIMAL(10,2) DEFAULT 0.00,
  max_services INTEGER, -- Max services they can list
  featured_listing BOOLEAN DEFAULT false,
  priority_support BOOLEAN DEFAULT false,
  analytics_access BOOLEAN DEFAULT false,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Lead tracking (when buyers contact providers)
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  rfq_id INTEGER REFERENCES rfqs(id) ON DELETE SET NULL,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'negotiating', 'converted', 'lost')),
  converted_to_order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_country ON users(country);
CREATE INDEX IF NOT EXISTS idx_providers_user_id ON providers(user_id);
CREATE INDEX IF NOT EXISTS idx_services_provider_id ON services(provider_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_rfqs_buyer_id ON rfqs(buyer_id);
CREATE INDEX IF NOT EXISTS idx_rfqs_status ON rfqs(status);
CREATE INDEX IF NOT EXISTS idx_rfqs_countries ON rfqs USING GIN(countries);
CREATE INDEX IF NOT EXISTS idx_quotes_rfq_id ON quotes(rfq_id);
CREATE INDEX IF NOT EXISTS idx_quotes_provider_id ON quotes(provider_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_provider_id ON orders(provider_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_leads_buyer_id ON leads(buyer_id);
CREATE INDEX IF NOT EXISTS idx_leads_provider_id ON leads(provider_id);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_date ON platform_analytics(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_rfqs_updated_at BEFORE UPDATE ON rfqs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
