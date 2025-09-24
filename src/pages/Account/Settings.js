import React, { useCallback } from "react";
import { logOut } from "../../utils/jwt-helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/features/user";
import { FiLogOut } from "react-icons/fi"; // Feather icon

const Settings = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  const onLogOut = useCallback(() => {
    logOut();
    navigate("/");
  }, [navigate]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>

        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-1">Logged in as:</p>
          <p className="font-semibold text-gray-800">
            {userInfo?.firstName} {userInfo?.lastName} ({userInfo?.email})
          </p>
        </div>

        <div className="border-t pt-6">
          <button
            onClick={onLogOut}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
