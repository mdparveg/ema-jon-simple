import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { useEffect } from 'react';
import { Link, Router } from 'react-router-dom';

const Shop = () => {
    const first = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(pdkey => {
            const product = fakeData.find(pd => pd.key === pdkey)
            product.quantity = savedCart[pdkey]
            return product;
        })
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count)
    }
    // const first = fakeData.map(x => x)
    // console.log(first);
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        addProduct={handleAddProduct}
                        product={pd}
                    ></Product>)
                }
            </div>
            <div className="twin-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
                <Router>
                    
                </Router>
        </div>
    );
};

export default Shop;