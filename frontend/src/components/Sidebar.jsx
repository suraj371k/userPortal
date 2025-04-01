import { Link } from 'react-router-dom';
import { FiHome, FiFile, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            <Link
              to="/dashboard"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              <FiHome className="mr-3 h-6 w-6 text-gray-500" />
              Dashboard
            </Link>
            <Link
              to="/files"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              <FiFile className="mr-3 h-6 w-6 text-gray-500" />
              File Management
            </Link>
            <Link
              to="/profile"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              <FiUser className="mr-3 h-6 w-6 text-gray-500" />
              User Profile
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;