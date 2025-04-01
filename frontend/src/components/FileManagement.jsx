import { useEffect } from 'react';
import {  FiUpload, FiTrash2, FiFile, FiFileText, FiFileMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, fetchUserFiles, downloadFile } from '../redux/fileSlice';

const FileManagement = () => {
  const dispatch = useDispatch();
  const { files = [], loading, error } = useSelector(state => state.files);
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchUserFiles());
  }, [dispatch]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadFile(file));
    }
  };


  const handleDownload = (fileName) => {
    dispatch(downloadFile(fileName));
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return <FiFile className="text-red-500" />;
      case 'XLSX':
      case 'XLS': return <FiFileMinus className="text-green-500" />;
      case 'TXT': return <FiFileText className="text-blue-500" />;
      default: return <FiFile className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">File Management</h2>
        <label className="btn btn-primary">
          <FiUpload className="mr-2" />
          Upload File
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Filename</th>
              <th>Type</th>
              <th>Size</th>
              <th>Upload Date</th>
              <th>Uploaded By</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file._id}>
                <td>
                  <div className="flex items-center">
                    <span className="mr-2">{getFileIcon(file.fileType)}</span>
                    <button 
                      onClick={() => handleDownload(file.filename)}
                      className="text-primary cursor-pointer hover:underline"
                    >
                      {file.filename}
                    </button>
                  </div>
                </td>
                <td>{file.fileType}</td>
                <td>  {file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "Unknown"}
                </td>
                <td><p>{file.createdAt ? new Date(file.createdAt).toLocaleString() : "N/A"}</p>

                </td>
                <td>{user.name}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileManagement;
