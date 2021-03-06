import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Service.css'

const Service = () => {

    const [service, setService] = useState([]);

    useEffect(() => {
        fetch('https://calm-shelf-61615.herokuapp.com/services')
            .then(res => res.json())
            .then(data => setService(data))
    }, []);

    return (
        <Container>
            <p className="font" style={{ textAlign: 'center', marginTop: '40px' }}>SHOP JUNO TOYS & GAMES</p>
            <h2 className="font service-title">Popular In <span className="single-word">Store</span></h2>
            <div className='all-service font'>

                {
                    service.slice(0, 6).map(s => <div className="single-service"
                        key={s.id}
                    >
                        <Link to={`/book/${s._id}`}>
                            <img src={s.img} alt="" />
                            <h4>{s.name}</h4>
                            <h6>{s.price}</h6>
                        </Link>

                    </div>)
                }

            </div>
            <Link to="/allProducts"> <button className="explore-btn font">Explore more..</button></Link>
        </Container>
    );
};

export default Service;