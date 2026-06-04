import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceCatalog from './pages/ServiceCatalog';
import ServiceDetail from './pages/ServiceDetail';
import Dashboard from './pages/Dashboard';
import ProviderProfile from './pages/ProviderProfile';
import RFQCreate from './pages/RFQCreate';
import RFQList from './pages/RFQList';
import RFQDetail from './pages/RFQDetail';
import QuotesList from './pages/QuotesList';
import Messages from './pages/Messages';
import Orders from './pages/Orders';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="services" element={<ServiceCatalog />} />
            <Route path="services/:id" element={<ServiceDetail />} />
            <Route path="providers/:id" element={<ProviderProfile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rfq/create" element={<RFQCreate />} />
            <Route path="rfq" element={<RFQList />} />
            <Route path="rfq/:id" element={<RFQDetail />} />
            <Route path="quotes" element={<QuotesList />} />
            <Route path="messages" element={<Messages />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
