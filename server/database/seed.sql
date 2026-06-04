-- Sample Data for Development/Testing - Africa Edition

-- Insert sample buyers (South African and other African businesses)
INSERT INTO users (name, email, password, company_name, user_type, country, phone) VALUES
('Thabo Mbeki', 'thabo@shoprite.co.za', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWYgMmp.', 'Shoprite Holdings', 'buyer', 'ZA', '+27123456789'),
('Amina Okonkwo', 'amina@jumia.ng', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWYgMmp.', 'Jumia Nigeria', 'buyer', 'NG', '+2348012345678'),
('Njeri Kamau', 'njeri@safaricom.ke', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWYgMmp.', 'Safaricom Kenya', 'buyer', 'KE', '+254712345678');

-- Insert sample providers (African fintech providers)
INSERT INTO users (name, email, password, company_name, user_type, country, phone) VALUES
('Sipho Ndlovu', 'sipho@payfast.co.za', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWYgMmp.', 'PayFast South Africa', 'provider', 'ZA', '+27112345678'),
('Kwame Asante', 'kwame@flutterwave.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWYgMmp.', 'Flutterwave', 'provider', 'NG', '+2341234567890'),
('Grace Wanjiru', 'grace@mpesa.ke', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWYgMmp.', 'M-Pesa Integration', 'provider', 'KE', '+254722334455'),
('Ahmed Hassan', 'ahmed@fawry.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWYgMmp.', 'Fawry Egypt', 'provider', 'EG', '+201234567890');

-- Insert provider profiles (African fintech companies)
INSERT INTO providers (user_id, description, services, certifications, website, is_verified, rating, total_reviews) VALUES
(4, 'South Africa''s trusted payment gateway provider. PCI-DSS compliant with 15+ years of experience in African markets', 
 ARRAY['Payment Processing', 'E-commerce Integration', 'Mobile Payments'], 
 '{"PCI-DSS": "Level 1", "POPIA": "Compliant", "ISO27001": "Certified", "SARB": "Registered"}', 
 'https://payfast.co.za', true, 4.9, 124),
(5, 'Pan-African payment technology provider. Processing payments in 30+ African countries with local currency support', 
 ARRAY['Payment Processing', 'Cross-Border Payments', 'Mobile Money'], 
 '{"PCI-DSS": "Level 1", "CBN": "Licensed", "ISO27001": "Certified"}', 
 'https://flutterwave.com', true, 4.8, 287),
(6, 'M-Pesa integration specialists. Leading mobile money solutions for East Africa', 
 ARRAY['Mobile Money Integration', 'USSD Services', 'Agent Banking'], 
 '{"Safaricom": "Certified Partner", "ISO27001": "Certified"}', 
 'https://mpesa-integration.ke', true, 4.9, 156),
(7, 'Egypt''s premier digital payment platform. Serving North Africa and Middle East', 
 ARRAY['Payment Processing', 'Bill Payments', 'Microfinance'], 
 '{"CBE": "Licensed", "PCI-DSS": "Certified", "ISO27001": "Certified"}', 
 'https://fawry.com', true, 4.7, 98);

-- Insert services (African fintech services)
INSERT INTO services (provider_id, name, description, category, pricing_type, base_price, delivery_time, features, is_active) VALUES
(1, 'PayFast Payment Gateway Integration', 
 'Complete South African payment gateway with instant EFT, credit cards, and SnapScan integration. SARB approved.', 
 'Payment Processing', 'fixed', 35000.00, '2-3 weeks',
 ARRAY['Instant EFT', 'Credit/Debit cards', 'SnapScan', 'Zapper', 'PCI-DSS compliant', 'Rand-based pricing'],
 true),
(2, 'Pan-African Payment Integration', 
 'Accept payments across 30+ African countries. Support for mobile money, bank transfers, and cards in local currencies.', 
 'Cross-Border Payments', 'tiered', 50000.00, '3-4 weeks',
 ARRAY['Multi-currency', 'M-Pesa', 'MTN Mobile Money', 'Airtel Money', 'Local bank transfers', 'FX management'],
 true),
(3, 'M-Pesa API Integration', 
 'Complete M-Pesa integration for payments, disbursements, and balance queries. Safaricom certified solution.', 
 'Mobile Money Integration', 'fixed', 40000.00, '2 weeks',
 ARRAY['Lipa Na M-Pesa', 'B2C disbursements', 'C2B payments', 'Balance queries', 'Transaction status', 'Webhook support'],
 true),
(4, 'FICA Compliance Solution', 
 'Comprehensive FICA (South Africa) and KYC compliance with ID verification, proof of address, and risk assessment.', 
 'Compliance & KYC', 'custom', NULL, '4-6 weeks',
 ARRAY['ID verification (SA ID, Passport)', 'Proof of residence', 'Biometric verification', 'Credit bureau checks', 'FICA reporting'],
 true),
(1, 'Microfinance Lending Platform', 
 'Digital lending platform for microfinance. Credit scoring, loan management, and mobile disbursements.', 
 'Lending & Microfinance', 'custom', NULL, '6-8 weeks',
 ARRAY['Credit scoring', 'Mobile disbursement', 'SMS notifications', 'Repayment tracking', 'Agent management'],
 true),
(2, 'USSD Banking Integration', 
 'Feature phone banking via USSD. Balance checks, transfers, and bill payments without smartphone.', 
 'Financial Inclusion Tech', 'fixed', 45000.00, '3-4 weeks',
 ARRAY['Multi-language support', 'Menu builder', 'Transaction processing', 'Network integration', 'Offline capability'],
 true);

-- Insert sample RFQs (African business needs)
INSERT INTO rfqs (buyer_id, title, description, category, requirements, budget, currency, countries, deadline, status) VALUES
(1, 'Mobile Payment Integration for Retail Chain', 
 'Shoprite needs mobile payment integration across 500 stores in South Africa. Must support SnapScan, Zapper, and contactless cards.',
 'Mobile Money Integration',
 '{"payment_methods": ["SnapScan", "Zapper", "NFC"], "stores": 500, "volume": "1M transactions/month", "compliance": "PCI-DSS"}',
 850000.00, 'ZAR', ARRAY['ZA'], '2026-08-01', 'open'),
(2, 'Cross-Border Payment Solution for E-commerce',
 'Jumia Nigeria requires cross-border payment solution to accept payments from customers across West Africa. Multi-currency support essential.',
 'Cross-Border Payments',
 '{"regions": ["Nigeria", "Ghana", "Kenya", "Senegal"], "currencies": ["NGN", "GHS", "KES", "XOF"], "volume": "50000/month"}',
 2500000.00, 'NGN', ARRAY['NG', 'GH', 'KE', 'SN'], '2026-07-15', 'open'),
(3, 'M-Pesa Integration for Bill Payments',
 'Looking for M-Pesa integration to allow customers to pay utility bills via mobile money. Need C2B and B2C capabilities.',
 'Mobile Money Integration',
 '{"services": ["C2B", "B2C", "Balance Query"], "volume": "100000/month", "compliance": "Safaricom API"}',
 350000.00, 'KES', ARRAY['KE'], '2026-07-30', 'open');

-- Insert sample quotes (African provider responses)
INSERT INTO quotes (rfq_id, provider_id, service_id, price, delivery_time, proposal, terms, status) VALUES
(1, 1, 1, 750000.00, '4 weeks',
 'PayFast proposes a comprehensive mobile payment solution for all 500 Shoprite stores:\n\n**Phase 1 (Weeks 1-2):** API integration and pilot stores (10 locations)\n**Phase 2 (Week 3):** Rollout to 250 stores\n**Phase 3 (Week 4):** Complete rollout and staff training\n\n**Included:**\n- SnapScan, Zapper, and contactless integration\n- PCI-DSS compliance certification\n- Real-time reporting dashboard\n- 24/7 technical support\n- Free POS terminal upgrades for 100 stores\n\n**Post-launch:** 60 days support and R50,000 marketing co-op.',
 '{"payment_schedule": "30% upfront, 40% at Phase 2, 30% on completion", "support": "60 days included", "warranty": "12 months", "training": "Included for all staff"}',
 'submitted'),
(2, 2, 2, 2200000.00, '5 weeks',
 'Flutterwave proposes a Pan-African payment solution for Jumia:\n\n**Coverage:** Nigeria, Ghana, Kenya, Senegal with local acquiring\n**Currencies:** NGN, GHS, KES, XOF with real-time FX\n**Methods:** Cards, bank transfers, mobile money (M-Pesa, MTN, Airtel)\n\n**Implementation:**\n- Week 1-2: Integration & Testing\n- Week 3-4: Country rollout\n- Week 5: Go-live & monitoring\n\n**Benefits:**\n- Single API for 4 countries\n- Local settlement in each currency\n- 99.9% uptime SLA\n- Dedicated account manager',
 '{"payment_schedule": "40% upfront, 60% on go-live", "transaction_fees": "2.9% + NGN 100 per transaction", "support": "24/7 premium support", "SLA": "99.9% uptime"}',
 'submitted');

-- Note: Password for all sample users is 'password123' (hashed with bcrypt)
-- In production, users would set their own secure passwords during registration
