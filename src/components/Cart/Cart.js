import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const totalPrice = cart.reduce((total, prod) => total + prod.price, 0);

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if (total > 500) {
        shipping = 0;
    }
    else if (total > 100) {
        shipping = 18
    }
    else if (total > 0) {
        shipping = 8
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return precision;
    }

    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered: {cart.length}</p>
            <h5>Product Price: ${formatNumber(total)}</h5>
            <h5>shipping Cost: ${shipping}</h5>
            <p><small>Tax: {tax}</small></p>
            <h5>Total: ${grandTotal}</h5>
            {
                props.children
            }
        </div>
    );
};

export default Cart;