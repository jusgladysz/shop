import { CartPage, MainPage, ProductsPage, SportsPage, ProductPageContainer } from './components';

export enum RoutePaths {
    MainPage = '/shop',
    Sports = '/sport',
    Products = '/product',
    Bestsellers = '/bestsellers',
    Brands = '/brands',
    Product = '/products/:id',
    Cart = '/cart',
}

export const routes = [
    {
        path: RoutePaths.Cart,
        element: <CartPage />,
        key: 'cart-page',
    },
    {
        path: RoutePaths.MainPage,
        element: <MainPage />,
        key: 'main-page',
    },
    // '/product?queries...'
    {
        path: RoutePaths.Products,
        exact: true,
        element: <ProductsPage />,
        key: 'products-page',
    },
    // '/sport'
    {
        path: RoutePaths.Sports,
        exact: true,
        element: <SportsPage />,
        key: 'sport-page',
    },
    // '/sport/product?queries...'
    {
        path: RoutePaths.Sports + RoutePaths.Products,
        element: <ProductsPage />,
        key: 'sport-product-page',
    },
    {
        path: RoutePaths.Product,
        element: <ProductPageContainer />,
        key: 'product',
    },
    // {
    //     path: RoutePaths.Bestsellers,
    //     element: <Bestsellers />,
    //     key: 'bestsellers-page',
    // },
    // {
    //     path: RoutePaths.Brands,
    //     element: <Brands />,
    //     key: 'brands-page',
    // },
];
