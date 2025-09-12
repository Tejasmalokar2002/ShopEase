import React, { useEffect, useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import content from '../../data/content.json'
const categories = content?.categories;
function ProductDetails() {
    const {product} = useLoaderData();
    const [image,setImage] = useState(product?.images[0] ?? product?.thumbnail);
    const [breadcrumbLinks, setBreadCrumbLink] = useState([]);
const productCategory = useMemo(() => {
  return categories?.find((category) => category?.id === product?.categoryId);
}, [product, categories]);




useEffect(() => {
  setImage(product?.thumbnail);
  setBreadCrumbLink([]);

  const arrayLinks = [{ title: 'Shop', path: '/' }];

  if (productCategory) {
    arrayLinks.push({
      title: productCategory?.name,
      path: productCategory?.path,
    });

    // Use correct types key from JSON
    const productTypes = productCategory?.types;

    // Fix `id` vs `type_id` issue
    const productType = productTypes?.find((item) =>
      (item?.id ?? item?.type_id) === product?.type_id
    );

    if (productType) {
      arrayLinks.push({
        title: productType?.name,
        path: productType?.name,
      });
    }
  }

  setBreadCrumbLink(arrayLinks);
}, [productCategory, product]);


  return (
    <div className='flex flex-col md:flex-row px-10'>
      <div className='w-[100%] lg:w-[50%] md:w-[40%]'>

        <div className='flex flex-col md:flex-row'>
            <div className='w-[100%] md:w-[30%] justify-center h-[40px] md:h-[420px]'>
                <div className='flex flew-row md:flex-col h-full justify-center'>
                    {
                        product?.images?.map((item, index)=>(
                            <button onClick={()=>setImage(item)} className=' rounded-lg w-fit p-2'><img src={item} className='h-[60px] w-[60px] bg-cover bg-center hover:scale-105' alt={'sample-'+index}/></button>
                        ))
                    }
                </div>
            </div>
            <div className='w-full md:w-[80%] flex justify-center md:pt-0 pt-10'>
                <img src={image} className={`w-full h-full max-h[520px]
         border rounded-lg cursor-pointer object-cover`} alt={product?.title}/>
            </div>
        </div>
      </div>
      <div className='w-[60%]'>
       <Breadcrumb links={breadcrumbLinks}/>
      </div>
    </div>
  )
}

export default ProductDetails
