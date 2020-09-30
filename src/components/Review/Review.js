import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../../components/Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory()
    const handleProceedCheckout = () => {
       history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        // const cartProducts = productkeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
        // })
        // setCart(cartProducts);
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
                <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
            </Cart>
            </div>
        </div>
    );
};

export default Review;