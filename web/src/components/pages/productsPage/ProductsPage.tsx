import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { PageResourceContext } from '../../../contexts';
import { useFilterProducts } from '../../../hooks';
import { Product, ProductCategory, ProductType, SportType } from '../../../interfaces';
import { ProductItem, SearchInput } from '../../shared';
import './style.css';
import { Pagination } from '../../shared/pagination/Pagination';

export const ProductsPage = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 12;
    const handlePages = (updatePage: number) => setPage(updatePage);

    const {
        pageResource: { products },
    } = useContext(PageResourceContext);
    const [header, setHeader] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchParams] = useSearchParams();

    const [nameSearch, setNameSearch] = useState('');
    const [minPriceSearch, setMinPriceSearch] = useState(0);
    // const [maxPriceSearch, setMaxPriceSearch] = useState(0);

    const sportType = searchParams.get('sportType') as SportType;
    const productType = searchParams.get('productType') as ProductType;
    const productCategory = searchParams.get('productCategory') as ProductCategory;
    const { productsFilteredByType } = useFilterProducts({
        products,
        productCategory,
        sportType,
        productType,
    });

    const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNameSearch(value);
    };

    const searchProductByMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMinPriceSearch(parseInt(value));
    };

    // const searchProductByMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value } = e.target;
    //     setMaxPriceSearch(parseInt(value));
    // };

    useEffect(() => {
        if (nameSearch === '' && minPriceSearch === 0) {
            setTotalPages(Math.ceil(productsFilteredByType.length / itemsPerPage));
            setFilteredProducts(productsFilteredByType);
            return;
        }

        const results: Product[] = filteredProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
                product.description.toLowerCase().includes(nameSearch.toLowerCase()),
        );
        setTotalPages(Math.ceil(results.length / itemsPerPage));
        setFilteredProducts(results);
    }, [nameSearch]);

    useEffect(() => {
        if (nameSearch === '' && minPriceSearch === 0) {
            setTotalPages(Math.ceil(productsFilteredByType.length / itemsPerPage));
            setFilteredProducts(productsFilteredByType);
            return;
        }

        const results: Product[] = filteredProducts.filter(
            (product) =>
                product.price >= minPriceSearch,
        );
        setTotalPages(Math.ceil(results.length / itemsPerPage));
        setFilteredProducts(results);
    }, [minPriceSearch]);

    // useEffect(() => {
    //     if (nameSearch === '' && minPriceSearch === 0) {
    //         setTotalPages(Math.ceil(productsFilteredByType.length / itemsPerPage));
    //         setFilteredProducts(productsFilteredByType);
    //         return;
    //     }
    //
    //     const results: Product[] = filteredProducts.filter(
    //         (product) =>
    //             product.price <= maxPriceSearch,
    //     );
    //     setTotalPages(Math.ceil(results.length / itemsPerPage));
    //     setFilteredProducts(results);
    // }, [maxPriceSearch]);


    useMemo(() => {
        if (!productCategory) return <Navigate replace to='/' />;
    }, []);

    useEffect(() => {
        let pageProducts = productsFilteredByType.slice((page - 1) * itemsPerPage, page * (itemsPerPage));
        setTotalPages(Math.ceil(productsFilteredByType.length / itemsPerPage));
        setFilteredProducts(pageProducts);
    }, [productsFilteredByType, page]);

    useEffect(() => {
        let text = '';
        if (productCategory) {
            text += productCategory;
        }
        if (!productCategory) {
            text += 'Sport';
        }
        if (sportType) {
            text += ` - ${sportType}`;
        }
        if (productType) {
            text += ` (${productType})`;
        }
        if (!text.length) {
            text = 'Sport Shop Products';
        }
        setHeader(text);
    }, [productCategory, sportType, productType]);

    return (
        <div className='products__page'>
            <h2 className='products__page__title'>{header}</h2>
            <SearchInput onSearch={searchProduct} />
            <SearchInput onSearch={searchProductByMinPrice} />
            {/*<SearchInput onSearch={searchProductByMaxPrice} />*/}
            <div className='products__page__items'>
                {filteredProducts.map((item) => {
                    return <ProductItem key={item._id} {...item} />;
                })}
            </div>
            <div>
                <Pagination page={page} totalPages={totalPages} handlePagination={handlePages} />
            </div>
        </div>
    );
};
