import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../Context/AuthProvider/useAuth/useAuth';
import './BookOrder.css';


const BookOrder = () => {

    const { id } = useParams();
    const { user } = useAuth();

    const [order, setOrder] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/services/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, []);


    const nameRef = useRef();
    const emailRef = useRef();
    const productNameRef = useRef();
    const productDesRef = useRef()

    const handlehtmlForm = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const desRef = productDesRef.current.value;
        const productName = productNameRef.current.value;

        const newOrder = { name: name, email: email, product: productName, description: desRef }

        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('We recived your order.');
                    e.target.reset()
                }



            })
        e.preventDefault()
    }


    return (
        <Container>
            <div className="font book-order">
                <h2 className="text-primary order-title">Fill this form to procced.</h2>
                <form onSubmit={handlehtmlForm}>
                    <img className="image-form" src={order.img} alt="" />

                    <legend className="legend-text">Your Name</legend>
                    <input ref={nameRef} type="text" required placeholder="Full name" />
                    <legend className="legend-text">User Email</legend>
                    <input ref={emailRef} type="text" required placeholder="Type email or username" value={user.email} />
                    <legend className="legend-text">Product Name</legend>
                    <input ref={productNameRef} required type="text" id="lname" name="lastname" placeholder="" value={order.name} />
                    <legend className="legend-text">Description</legend>
                    <input className="description" ref={productDesRef} required type="text" id="lname" name="lastname" placeholder="" value={order.description} />
                    <input type="submit" value="Place Order" />
                </form>
            </div>
        </Container>
    );
};

export default BookOrder;