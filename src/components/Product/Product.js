import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
               <Link to={"/product/"+key}> <img src={img} alt="" /></Link>
            </div>
            <div className="product-name">
                <h4> <Link to={"/product/"+key}>{name}</Link> </h4>
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <br />
                <p>Only {stock} left in stock - order soon</p>
               { props.showAddToCart && <button className="main-button"
                    onClick={() => props.addProduct(props.product)}
                ><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;