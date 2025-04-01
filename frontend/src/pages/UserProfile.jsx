import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user: authUser , isLoading } = useSelector((state) => state.auth);
  
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    if (authUser) {
      setUser({
        name: authUser.name || '',
        email: authUser.email || '',
        phone: authUser.phone || ''
      });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSave = () => {
    dispatch(updateProfile(user));
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">User Profile</h2>
        {isEditing ? (
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            className="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;