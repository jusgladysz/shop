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
    const [productsForPage, setProductsForPage] = useState<Product[]>([]);

    const [nameSearch, setNameSearch] = useState('');
    const [minPriceSearch, setMinPriceSearch] = useState('');
    const [maxPriceSearch, setMaxPriceSearch] = useState('');

    const sportType = searchParams.get('sportType') as SportType;
    const productType = searchParams.get('productType') as ProductType;
    const productCategory = searchParams.get('productCategory') as ProductCategory;
    const { productsFilteredByType } = useFilterProducts({
        products,
        productCategory,
        sportType,
        productType,
    });

    const searchProductByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNameSearch(value);
    };

    const searchProductByMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMinPriceSearch(value);
    };

    const searchProductByMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMaxPriceSearch(value);
    };

    useEffect(() => {
        let results: Product[] = productsFilteredByType;

        const filterProductsByName = () => {
            results = results.filter(
                (product) =>
                    product.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    product.description.toLowerCase().includes(nameSearch.toLowerCase()),
            );
        };

        const filterProductsByMinPrice = () => {
            results = results.filter(
                (product) =>
                    product.price >= parseInt(minPriceSearch),
            );
        };

        const filterProductsByMaxPrice = () => {
            results = results.filter(
                (product) =>
                    product.price <= parseInt(maxPriceSearch),
            );
        };

        if (nameSearch != '') {
            filterProductsByName();
        }

        if (minPriceSearch != '') {
            filterProductsByMinPrice();
        }

        if (maxPriceSearch != '') {
            filterProductsByMaxPrice();
        }

        setFilteredProducts(results);

        let pageProducts = results.slice((page - 1) * itemsPerPage, page * (itemsPerPage));
        setTotalPages(Math.ceil(results.length / itemsPerPage));
        setProductsForPage(pageProducts);
        setPage(1);
    }, [nameSearch, minPriceSearch, maxPriceSearch]);

    useMemo(() => {
        if (!productCategory) return <Navigate replace to='/' />;
    }, []);

    useEffect(() => {
        let pageProducts = productsFilteredByType.slice((page - 1) * itemsPerPage, page * (itemsPerPage));
        setTotalPages(Math.ceil(productsFilteredByType.length / itemsPerPage));
        setProductsForPage(pageProducts);
    }, [productsFilteredByType]);

    useEffect(() => {
        let pageProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * (itemsPerPage));
        setProductsForPage(pageProducts);
    }, [page]);

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
            <div className='products__page__search'>
                <SearchInput onSearch={searchProductByName} />
                <div className='products__page__search-price'>
                    <input
                        type='text'
                        onChange={searchProductByMinPrice}
                        placeholder='Min price...'
                        className='search-price-button'
                    />
                    <input
                        type='text'
                        onChange={searchProductByMaxPrice}
                        placeholder='Max price...'
                        className='search-price-button'
                    />
                </div>
            </div>
            <div className='products__page__items'>
                {productsForPage.map((item) => {
                    return <ProductItem key={item._id} {...item} />;
                })}
            </div>
            <div>
                <Pagination page={page} totalPages={totalPages} handlePagination={handlePages} />
            </div>
        </div>
    );
};