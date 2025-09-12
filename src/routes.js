import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Shop from './Shop';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDetails from './pages/ProductDetailPage/ProductDetails';
import { loadProductById } from './routes/products';

export const router = createBrowserRouter([
  {
    element: <RootLayout />, // This wraps all child routes with Navigation
    children: [
      {
        path: '/',
        element: <Shop />,
      },
      {
        path: '/women',
        element: <ProductListPage categoryType={'WOMEN'} />,
      },
      {
        path: '/men',
        element: <ProductListPage categoryType={'MEN'} />,
      },{
        path: '/product/:productId',
        loader: loadProductById,
        element: <ProductDetails />,
      },
    ],
  },
]);
