// import content from '../data/content.json';
// import store from '../store/store';
// export const loadProductBySlug = async ({ params }) => {
//     const productId = parseInt(params?.productId, 10);

//     const product = content?.products?.find((p) => p?.id === productId);

//     if (!product) {
//         throw new Response("Product not found", { status: 404 });
//     }

//     return { product }; // ✅ Return object with `product` key
// };



import { getProductBySlug } from '../api/fetchProducts';
import { setLoading } from '../store/features/common';
import store from '../store/store';

export const loadProductBySlug = async ({params}) =>{
    try{
        store.dispatch(setLoading(true));
        const product = await getProductBySlug(params?.slug);
        store.dispatch(setLoading(false));
        return {product};
    }
    catch(err){

    }
}