import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, BtnMode } from '../Button';
import { Tooltip } from '../Tooltip';
import { Ellipsis } from '../Ellipsis';
import { ProductStars } from '../ProductStars';

import { CURRENCY_TYPE } from '../../../constants';
import { addProductToCartAction } from '../../../services/actions';
import { aSizes, Product, RoutePaths } from '../../../models';
import placeholder from '../../../assets/images/placeholder.jpg';

import './style.css';

export const ProductItem = (item: Product): JSX.Element => {
    const { img, name, description, price, _id, stars, size } = item;

    const dispatch = useDispatch();

    return (
        <div className="product__item">
            <Link className="product-link" to={`${RoutePaths.Product}/${_id}`}>
                <div className="product__header">
                    <img
                        className="product__image"
                        src={img && true ? img : placeholder}
                        alt="product__image"
                    />
                </div>
                <div className="product__body">
                    <div className="product__title">
                        <Tooltip content={name}>
                            <Ellipsis textLength={1}>
                                <h4>{name}</h4>
                            </Ellipsis>
                        </Tooltip>
                    </div>
                    <div className="product__price">
                        <p>
                            {CURRENCY_TYPE}
                            {price} size:{size}
                        </p>
                    </div>
                    <div className="product__description">
                        <Tooltip content={description}>
                            <Ellipsis textLength={1}>{description}</Ellipsis>
                        </Tooltip>
                    </div>
                </div>
            </Link>
            <div className="product__buttons">
                <Button
                    mode={BtnMode.SECONDARY}
                    type="button"
                    onClick={() => dispatch(addProductToCartAction(item))}
                >
                    Add to cart
                </Button>
                {stars && <ProductStars count={Number(stars)} />}
            </div>
        </div>
    );
};
