import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">File Management System</h1>
          <nav className="flex space-x-4">
        
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/files" className="text-gray-600 hover:text-gray-900">
              Files
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
              Profile
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn btn-error text-white hover:bg-red-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
