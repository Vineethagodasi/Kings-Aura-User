import { useSelector } from "react-redux";

function UserProfile() {
  const { user, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn || !user) {
    return <div className="text-white">Not logged in</div>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white max-w-sm">
      <h2 className="font-cinzel text-2xl mb-4">👤 User Profile</h2>
      
      <div className="space-y-3">
        <div>
          <p className="text-black text-sm">Full Name</p>
          <p className="text-lg text-gray-600 font-medium">{user.fullname}</p>
        </div>

        <div>
          <p className="text-black text-sm">Email</p>
          <p className="text-lg text-gray-600">{user.email}</p>
        </div>

        <div>
          <p className="text-black text-sm">Gender</p>
          <p className="text-lg text-gray-600 capitalize">{user.gender}</p>
        </div>

        <div>
          <p className="text-primary text-xs">ID: {user._id}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
