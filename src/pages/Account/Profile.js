import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAddress, selectUserInfo } from "../../store/features/user";
import AddAddress from "./AddAddress";
import { setLoading } from "../../store/features/common";
import { deleteAddressAPI } from "../../api/userInfo";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const [addAddress, setAddAddress] = useState(false);
  const dispatch = useDispatch();

  const onDeleteAddress = useCallback(
    (id) => {
      dispatch(setLoading(true));
      deleteAddressAPI(id)
        .then(() => {
          dispatch(removeAddress(id));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch]
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

      {!addAddress ? (
        <>
          {/* Contact Details */}
          <div className="bg-white shadow rounded-lg p-6 mb-8 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Contact Information
              </h2>
              <button className="text-blue-700 underline hover:text-blue-900 text-sm">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="font-semibold">
                  {userInfo?.firstName} {userInfo?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p className="font-semibold">
                  {userInfo?.phoneNumber ?? "None"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="font-semibold">{userInfo?.email}</p>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white shadow rounded-lg p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Addresses</h2>
              <button
                onClick={() => setAddAddress(true)}
                className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition"
              >
                Add New Address
              </button>
            </div>

            {userInfo?.addressList?.length === 0 ? (
              <p className="text-gray-500">No addresses saved yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userInfo?.addressList?.map((address) => (
                  <div
                    key={address?.id}
                    className="bg-gray-100 p-4 rounded-lg border border-gray-300"
                  >
                    <p className="font-semibold text-gray-800 mb-1">
                      {address?.name}
                    </p>
                    <p className="text-sm text-gray-600">{address?.phoneNumber}</p>
                    <p className="text-sm text-gray-600">
                      {address?.street}, {address?.city}, {address?.state}
                    </p>
                    <p className="text-sm text-gray-600">{address?.zipCode}</p>

                    <div className="mt-4 flex space-x-4">
                      <button className="text-blue-700 text-sm underline hover:text-blue-900">
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteAddress(address?.id)}
                        className="text-red-600 text-sm underline hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <AddAddress onCancel={() => setAddAddress(false)} />
      )}
    </div>
  );
};

export default Profile;
