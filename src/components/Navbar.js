import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./../lib/helper/supabaseClient";
import useAuthStatus from "./../hooks/useAuthStatus";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuthStatus();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
    if (location.pathname === "/quiz") {
        navigate("/");
      }
  };

  return (
    <nav className="bg-white shadow-md w-screen sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Deutsch Quiz
            </Link>
          </div>

          {/* Menu section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/leaderboard")}
              className="h-10 inline-flex items-center px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Leaderboard
            </button>
            {user ? (
              <>
                <button
                  onClick={() => navigate("/quiz")}
                  className="h-10 inline-flex items-center px-4 border-2 border-blue-600 rounded-lg shadow-sm text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  ทำแบบทดสอบ
                </button>

                {/* Profile section */}
                <div className="flex items-center gap-3">
                  <div className="h-10 flex items-center gap-3 bg-gray-100 px-2 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-base font-medium text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-medium text-gray-900">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className={`h-10 inline-flex items-center px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 ${
                      loading
                        ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loading ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}{" "}
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="h-10 inline-flex items-center px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                เข้าสู่ระบบ
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
