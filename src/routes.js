import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Shop from './Shop';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDetails from './pages/ProductDetailPage/ProductDetails';
import { loadProductBySlug } from './routes/products';
import AuthenticationWrapper from './pages/AuthenticationWrapper';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import OAuth2LoginCallback from './pages/OAuth2LoginCallback';
import Cart from './pages/Cart/Cart';

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
        path: '/product/:slug',
        loader: loadProductBySlug,
        element: <ProductDetails />,
      },{
         path:'/cart-items',
         element: <Cart />
        },
    ],
  },
  {
      path:"/v1/",
      element:<AuthenticationWrapper />,
      children:[
        {
          path:"login",
          element:<Login />
        },
        {
          path:"register",
          element:<Register />
        }
      ]
    }, {
      path:'/oauth2/callback',
      element:<OAuth2LoginCallback />
    },
]);
