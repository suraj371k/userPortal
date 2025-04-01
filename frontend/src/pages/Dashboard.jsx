import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiFile, FiFileText, FiFileMinus, FiUsers } from "react-icons/fi";
import { fetchUserFiles } from "../redux/fileSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Access Redux store state
  const { files = [], loading, error } = useSelector((state) => state.files);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserFiles());
    }
  }, [dispatch, user]);

  // Compute dashboard statistics
  const totalFiles = files.length;

  // File type statistics
  const fileTypes = files.reduce((acc, file) => {
    if (file.fileType) {
      const type = file.fileType.toUpperCase();
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {});

  // Files per user statistics with better error handling
  const filesPerUser = files.reduce((acc, file) => {
    const userName = file.user?.name || 'Unknown User';
    acc[userName] = (acc[userName] || 0) + 1;
    return acc;
  }, {});

  // Sort users by file count (descending)
  const sortedUsers = Object.entries(filesPerUser)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Show top 5 users

  // Sort file types by count (descending)
  const sortedFileTypes = Object.entries(fileTypes)
    .sort((a, b) => b[1] - a[1]);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* User Info Section */}
      {user && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold">Welcome, {user.name}</h3>
          <p className="text-gray-600">Email: {user.email}</p>
         
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Files Card */}
        <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FiFile size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Files</h3>
                <p className="text-2xl font-bold">{totalFiles}</p>
                <p className="text-sm text-gray-500">Across all users</p>
              </div>
            </div>
          </div>
        </div>

        {/* File Types Card */}
        <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-4">File Types</h3>
            {sortedFileTypes.length > 0 ? (
              <div className="space-y-3">
                {sortedFileTypes.map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <div className="flex items-center">
                      {type === "PDF" && <FiFile className="text-red-500 mr-2" />}
                      {["XLSX", "XLS", "CSV"].includes(type) && <FiFileMinus className="text-green-500 mr-2" />}
                      {type === "TXT" && <FiFileText className="text-blue-500 mr-2" />}
                      {!["PDF", "XLSX", "XLS", "CSV", "TXT"].includes(type) && 
                        <FiFile className="text-gray-500 mr-2" />}
                      <span className="capitalize">{type.toLowerCase()}</span>
                    </div>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No file types available</p>
            )}
          </div>
        </div>

        {/* Top Uploaders Card */}
        <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FiUsers size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Top Uploaders</h3>
                <p className="text-sm text-gray-500">Showing top 5 users</p>
              </div>
            </div>
            {sortedUsers.length > 0 ? (
              <div className="space-y-3">
                {sortedUsers.map(([userName, count]) => (
                  <div key={userName} className="flex justify-between items-center">
                    <span className="truncate max-w-[120px]">{userName}</span>
                    <span className="font-semibold">
                      {count} file{count !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No files uploaded yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;