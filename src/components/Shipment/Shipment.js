import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {

    const { register, handleSubmit, watch, errors } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const onSubmit = data => {
      const savedCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: savedCart , shipment: data, orderTime: new Date()}

      fetch('http://localhost:5000/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          alert('your order Successfully')
        }
      })

    };
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
        {errors.exampleRequired && <span className="error">Name is required</span>}
      
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
        {errors.exampleRequired && <span className="error">Email is required</span>}
       
        <input name="Address" ref={register({ required: true })} />
        {errors.exampleRequired && <span className="error">Address is required</span>}
       
        <input name="phone" ref={register({ required: true })} />
        {errors.exampleRequired && <span className="error">Phone number is required</span>}
        <input type="submit"/>
      </form>
    );
};  

export default Shipment;