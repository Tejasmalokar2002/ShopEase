// pages/ProductListPage/NewArrivalProduct.jsx
import React, { useEffect, useMemo, useState } from 'react'
import FilterIcon from '../../components/common/FilterIcon'
import Categories from '../../components/Filters/Categories'
import content from '../../data/content.json'
import PriceFilter from '../../components/Filters/PriceFilter';
import ColorsFilter from '../../components/Filters/ColorsFilter';
import SizeFilter from '../../components/Filters/SizeFilter';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../api/fetchProducts';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { useParams } from 'react-router-dom';

const NewArrivalProduct = () => {
  const { categoryType } = useParams();
  const categoryData = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  console.log('URL categoryType:', categoryType); // Debug log
  console.log('Redux categories:', categoryData); // Debug log

  // Find category by ID (since you're passing UUIDs)
  const category = useMemo(() => {
    if (!categoryData || !categoryType) return null;
    
    // Since you're passing UUIDs, search by ID
    return categoryData.find(category => category.id === categoryType);
  }, [categoryData, categoryType]);

  console.log('Found category:', category); // Debug log

  useEffect(() => {
    console.log('useEffect triggered with categoryType:', categoryType); // Debug log
    
    if (categoryType) {
      dispatch(setLoading(true));
      console.log('Calling getAllProducts with categoryId:', categoryType); // Debug log
      
      getAllProducts(categoryType).then(res => {
        console.log('API Response:', res); // Debug log
        setProducts(res || []);
      }).catch(err => {
        console.error('Error fetching products:', err);
        setProducts([]);
      }).finally(() => {
        dispatch(setLoading(false));
      });
    }
  }, [categoryType, dispatch]);

  // Add loading state
  if (!categoryType) {
    return <div className="text-center py-8">No category specified</div>;
  }

  return (
    <div>
      <div className='flex'>
        <div className='w-[20%] p-[20px] border rounded-lg m-[20px]'>
          <div className='flex justify-between'>
            <p className='text-[16px] text-gray-600'>Filter</p>
            <FilterIcon />
          </div>

          <div className=''>
            <p className='text-[16px] text-black-600 mt-5'>Categories</p>
            <Categories types={category?.types} />
            <hr></hr>
          </div>
          <div>
            <PriceFilter />
            <hr></hr>
            <ColorsFilter colors={category?.meta_data?.colors} />
            <hr></hr>
            <SizeFilter sizes={category?.meta_data?.sizes} />
          </div>
        </div>
        <div className='p-[15px] flex-1'>
          <p className='text-black text-lg'>{category?.description || category?.name || `Products for ${categoryType}`}</p>
          <div className='pt-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 px-2'>
            {products?.map((item, index) => (
              <ProductCard key={item?.id + "_" + index} {...item} title={item?.name} />
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found for this category.</p>
              <p className="text-gray-400 text-sm">Category ID: {categoryType}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewArrivalProduct