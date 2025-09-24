import React, { useCallback, useEffect } from "react";
import { logOut } from "../../utils/jwt-helper";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";
import { loadUserInfo, selectIsUserAdmin, selectUserInfo } from "../../store/features/user";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

 
    return (
    <div className="p-6 max-w-7xl mx-auto">
      {isUserAdmin && (
        <div className="flex justify-end mb-4">
          <Link
            to="/admin"
            className="text-blue-600 hover:text-blue-800 font-semibold underline text-sm"
          >
            Manage Admin
          </Link>
        </div>
      )}

      {userInfo?.email && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Hello, {userInfo.firstName}
          </h1>
          <p className="text-gray-600 mb-6">Welcome to your account dashboard.</p>

          <div className="md:flex gap-6">
            {/* Navigation */}
            <div className="md:w-1/4">
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Profile", to: "/account-details/profile", icon: "👤" },
                  { label: "Orders", to: "/account-details/orders", icon: "📦" },
                  { label: "Settings", to: "/account-details/settings", icon: "⚙️" },
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        isActive
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors",
                      ].join(" ")
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 mt-6 md:mt-0 bg-gray-50 p-4 rounded-lg border">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
