import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../../components/Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart)
        const cartProducts = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    }, []);

    let thankYou;
    if (orderPlaced){
        thankYou  = <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container">
           <div className="product-container"> {
                cart.map(pd => <ReviewItem
                    removeProduct={removeProduct}
                    key={pd.key}
                    product={pd}></ReviewItem>)
            }
          {
              thankYou
          }
            </div>
            <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
            </Cart>
            </div>
        </div>
    );
};

export default Review;