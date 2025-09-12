import content from '../data/content.json';

export const loadProductById = async ({ params }) => {
    const productId = parseInt(params?.productId, 10);

    const product = content?.products?.find((p) => p?.id === productId);

    if (!product) {
        throw new Response("Product not found", { status: 404 });
    }

    return { product }; // ✅ Return object with `product` key
};
