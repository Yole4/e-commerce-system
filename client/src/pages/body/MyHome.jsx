import React, { useContext } from 'react'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext';
import { AuthContext } from '../../context/AuthContext';

function MyHome() {
    const navigate = useNavigate();
    const { settingsData } = useContext(AdminContext);

    return (
        <>
            <Header />
            <div className='home' style={{ marginTop: '-60px' }}>
                <div class="content">
                    <h3 style={{ fontSize: '50px' }}>{settingsData?.title}</h3>
                    <span style={{ fontSize: '30px' }}>Revolutionize Your Digital Presence with Cutting-edge Tech Solutions</span>
                    <p style={{ fontSize: '15px' }}>Embark on a journey of innovation with our latest IT products, expertly crafted to redefine and elevate your online experience. Dive into the forefront of technology as we unveil revolutionary solutions tailored to meet the evolving demands of the digital era.</p>
                    <a href="#" onClick={() => navigate('/home')} style={{ fontSize: '20px' }} class="btns">Shop Now</a>

                </div>
            </div>
        </>
    )
}

export default MyHome