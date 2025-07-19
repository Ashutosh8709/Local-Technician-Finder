import PlumbingIcon from '@mui/icons-material/Plumbing';
import {useNavigate} from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

export default function NavBar(){
    const navigate=useNavigate();
    const user=localStorage.getItem('UserID');
    return (
  <nav className="fixed top-0 w-full bg-gray-900 h-16 flex items-center px-4 shadow-md z-50">
    {/* Left - Logo */}
    <div className="flex items-center gap-2">
      <PlumbingIcon sx={{ color: 'red', fontSize: 40 }} />
      <h1 className="text-white text-xl font-semibold">Local Hands</h1>
    </div>

    {/* Right - Auth Links */}
    <div className="ml-auto flex items-center gap-6 text-white text-sm font-medium">
      {!user ? (
        <>
          <p
            className="cursor-pointer hover:text-red-400 transition"
            onClick={() => navigate('/signup')}
          >
            Signup
          </p>
          <p
            className="cursor-pointer hover:text-red-400 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </p>
        </>
      ) : (
        <p
          className="cursor-pointer hover:text-red-400 transition"
          onClick={() => {
            localStorage.removeItem('UserID');
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            handleSuccess('User Logged Out');
            setTimeout(() => {
              navigate('/login');
            }, 1000);
          }}
        >
          Logout
        </p>
      )}
    </div>

    <ToastContainer />
  </nav>
);
}