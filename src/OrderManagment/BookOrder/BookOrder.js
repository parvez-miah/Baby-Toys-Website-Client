import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import useAuth from '../../Context/AuthProvider/useAuth/useAuth';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import './BookOrder.css';


const BookOrder = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const history = useHistory()

    const [order, setOrder] = useState({});

    useEffect(() => {
        const url = `https://calm-shelf-61615.herokuapp.com/services/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, []);


    const nameRef = useRef();
    const statusRef = useRef()
    const emailRef = useRef();
    const productNameRef = useRef();
    const productDesRef = useRef();
    const noteRef = useRef()

    const handlehtmlForm = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const desRef = productDesRef.current.value;
        const productName = productNameRef.current.value;
        const sta_tus = statusRef.current.value;
        const no_te = noteRef.current.value;

        const newOrder = { name: name, email: email, product: productName, description: desRef, status: sta_tus, note: no_te }

        fetch('https://calm-shelf-61615.herokuapp.com/users', {
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
                    history.push('/my-orders')
                }



            })
        e.preventDefault()
    }


    return (
        <div>
            <Header></Header>
            <Container>
                <div className="font book-order">
                    <h2 className="text-primary order-title">Fill this form to procced.</h2>
                    <form onSubmit={handlehtmlForm}>
                        <legend className="legend-text">Your Name</legend>
                        <input ref={nameRef} type="text" required placeholder="Full name" />
                        <legend className="legend-text">User Email</legend>
                        <input ref={emailRef} type="text" required placeholder="Type email or username" value={user.email} />
                        <legend className="legend-text">Product Name</legend>
                        <input ref={productNameRef} required type="text" id="lname" name="lastname" placeholder="" value={order.name} />
                        <legend className="legend-text">Description</legend>
                        <input className="description" ref={productDesRef} required type="text" id="lname" name="lastname" placeholder="" value={order.description} />
                        <legend className="legend-text">Default Status</legend>
                        <input className="description" ref={statusRef} required type="text" id="lname" name="lastname" placeholder="" value="Pending" />
                        <input className="description" ref={noteRef} required type="text" id="lname" name="lastname" placeholder="Add a note" />
                        <input type="submit" value="Place Order" />
                    </form>
                </div>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default BookOrder;