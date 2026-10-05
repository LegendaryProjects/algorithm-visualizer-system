import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ProgressDashboard from './pages/ProgressDashboard';
import Visualizer from './pages/Visualizer';

// Helper component for the top navigation bar
function Navigation() {
  const location = useLocation();
  
  // Checks if the current URL matches the link to highlight the active tab
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#111827] border-b border-gray-800 text-gray-300 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-10">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-white text-lg tracking-wide">
          <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
          Algorithm Visualizer
        </div>
        
        {/* Real, working navigation links */}
        <div className="flex gap-8 text-sm font-medium">
          <Link to="/" className={`pb-4 -mb-4 ${isActive('/') ? 'text-yellow-500 border-b-2 border-yellow-500' : 'hover:text-white transition-colors'}`}>
            Visualizer Sandbox
          </Link>
          <Link to="/admin" className={`pb-4 -mb-4 ${isActive('/admin') ? 'text-yellow-500 border-b-2 border-yellow-500' : 'hover:text-white transition-colors'}`}>
            Admin Dashboard
          </Link>
          <Link to="/progress" className={`pb-4 -mb-4 ${isActive('/progress') ? 'text-yellow-500 border-b-2 border-yellow-500' : 'hover:text-white transition-colors'}`}>
            Progress Dashboard
          </Link>
        </div>

      </div>
    </nav>
  );
}

// Main App Component
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0b0f19] font-sans">
        <Navigation />
        
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Visualizer />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/progress" element={<ProgressDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}