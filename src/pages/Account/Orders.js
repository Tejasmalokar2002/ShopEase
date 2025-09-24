import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { cancelOrderAPI, fetchOrderAPI } from '../../api/userInfo';
import {
  cancelOrder,
  loadOrders,
  selectAllOrders,
} from '../../store/features/user';
import moment from 'moment';
import Timeline from '../../components/Timeline/Timeline';
import { getStepCount } from '../../utils/order-util';

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter, setSelectedFilter] = useState('ACTIVE');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');

  useEffect(() => {
    dispatch(setLoading(true));
    fetchOrderAPI()
      .then((res) => {
        dispatch(loadOrders(res));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    const displayOrders = allOrders?.map((order) => ({
      id: order?.id,
      orderDate: order?.orderDate,
      orderStatus: order?.orderStatus,
      status:
        order?.orderStatus === 'PENDING' ||
        order?.orderStatus === 'IN_PROGRESS' ||
        order?.orderStatus === 'SHIPPED'
          ? 'ACTIVE'
          : order?.orderStatus === 'DELIVERED'
          ? 'COMPLETED'
          : order?.orderStatus,
      items: order?.orderItemList?.map((orderItem) => ({
        id: orderItem?.id,
        name: orderItem?.product?.name,
        price: orderItem?.product?.price,
        quantity: orderItem?.quantity,
        url: orderItem?.product?.resources?.[0]?.url,
        slug: orderItem?.product?.slug,
      })),
      totalAmount: order?.totalAmount,
    }));
    setOrders(displayOrders);
  }, [allOrders]);

  const handleOnChange = useCallback((evt) => {
    setSelectedFilter(evt?.target?.value);
  }, []);

  const onCancelOrder = useCallback(
    (id) => {
      dispatch(setLoading(true));
      cancelOrderAPI(id)
        .then(() => {
          dispatch(cancelOrder(id));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch]
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Orders</h1>
        <select
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          value={selectedFilter}
          onChange={handleOnChange}
        >
          <option value="ACTIVE">Active</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {orders?.filter((o) => o.status === selectedFilter).length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders found in this category.</p>
      ) : (
        <div className="space-y-6">
          {orders
            ?.filter((order) => order.status === selectedFilter)
            .map((order) => (
              <div key={order.id} className="bg-white border rounded-lg shadow p-4">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      Order #{order?.id}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on: {moment(order?.orderDate).format('MMMM DD, YYYY')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Delivery by: {moment(order?.orderDate).add(3, 'days').format('MMMM DD, YYYY')}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 flex flex-col md:items-end mt-2 md:mt-0">
                    <span className="mb-1">Status: <strong>{order?.orderStatus}</strong></span>
                    <button
                      onClick={() => setSelectedOrder(order?.id)}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {selectedOrder === order?.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>

                {selectedOrder === order?.id && (
                  <div className="mt-4">
                    <div className="divide-y divide-gray-200 mb-4">
                      {order?.items?.map((item) => (
                        <div key={item.id} className="flex py-4 gap-4">
                          <img
                            src={item?.url}
                            alt={item?.name}
                            className="w-24 h-24 rounded object-cover border"
                          />
                          <div>
                            <p className="text-gray-800 font-medium">{item?.name}</p>
                            <p className="text-gray-600 text-sm">Quantity: {item?.quantity}</p>
                            <p className="text-gray-600 text-sm">Price: ${item?.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-gray-700 font-semibold mb-4">
                      <span>Total: ${order?.totalAmount}</span>
                    </div>

                    {order?.orderStatus !== 'CANCELLED' && (
                      <>
                        <div className="mb-4">
                          <Timeline stepCount={getStepCount[order?.orderStatus]} />
                        </div>

                        {getStepCount[order?.orderStatus] <= 2 && (
                          <button
                            onClick={() => onCancelOrder(order?.id)}
                            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-900 transition"
                          >
                            Cancel Order
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
