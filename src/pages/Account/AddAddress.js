import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { addAddressAPI } from '../../api/userInfo';
import { saveAddress } from '../../store/features/user';

const AddAddress = ({ onCancel }) => {
  const [values, setValues] = useState({
    name: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setLoading(true));
      setError('');
      addAddressAPI(values)
        .then((res) => {
          dispatch(saveAddress(res));
          onCancel && onCancel();
        })
        .catch((err) => {
          setError('Address was not added.');
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, onCancel, values]
  );

  const handleOnChange = useCallback((e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Address</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleOnChange}
            placeholder="Contact person name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleOnChange}
            placeholder="Contact number"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            name="street"
            value={values.street}
            onChange={handleOnChange}
            placeholder="Street address"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleOnChange}
              placeholder="City"
              className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="w-1/2">
            <input
              type="text"
              name="state"
              value={values.state}
              onChange={handleOnChange}
              placeholder="State"
              className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            name="zipCode"
            value={values.zipCode}
            onChange={handleOnChange}
            placeholder="Zip code"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
