import React from 'react';
import SvgFavourite from '../../components/common/SvgFavourite';
import { Link } from 'react-router-dom';

const ProductCard = ({
  id,
  title,
  description,
  price,
  discount,
  rating,
  brand,
  thumbnail,
  slug,
}) => {
  return (
    <div className="w-full max-w-sm flex flex-col relative border rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
      
      <Link to={`/product/${id}`}>
        <img
          className="h-64 w-full object-cover cursor-pointer"
          src={thumbnail}
          alt={title}
        />
      </Link>

      <div className="flex justify-between items-start p-4">
        <div className="flex flex-col pr-2">
          <p className="text-base font-medium text-gray-900 truncate">{title}</p>
          {description && (
            <p className="text-sm text-gray-600">{brand}</p>
          )}
        </div>
        <div className="text-sm font-semibold text-gray-800 whitespace-nowrap">
          ${price}
        </div>
      </div>

      <button
        onClick={() => console.log('Click button')}
        className="absolute top-0 right-0 pt-3 pr-3 cursor-pointer"
      >
        <SvgFavourite />
      </button>
    </div>
  );
};

export default ProductCard;
