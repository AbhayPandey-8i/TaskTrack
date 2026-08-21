import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/user/logout");
      if (res.data.success) {
        dispatch(clearUser());
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-gray-900/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="group">
            <h1 className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-300 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white">
                Task
                <span className="text-yellow-300 italic group-hover:text-yellow-200 transition-colors duration-300">
                  Track
                </span>
              </span>
            </h1>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Welcome */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 text-gray-900 font-bold text-xs sm:text-sm shadow-sm ring-2 ring-white/10">
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <span className="absolute bottom-0 right-0 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>

              <div className="hidden sm:block leading-tight">
                <p className="text-xs text-slate-400">Welcome back</p>
                <p className="text-sm font-semibold text-white">
                  {user?.name?.split(" ")[0] || "there"}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-300
          border border-slate-700 rounded-lg
          hover:text-white hover:bg-slate-800 hover:border-slate-600
          transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
