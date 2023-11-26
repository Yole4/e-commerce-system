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
                    <span style={{ fontSize: '30px' }}>Revolutionizing Your Digital Landscape with Cutting-edge Online Tech Solutions</span>
                    <p style={{ fontSize: '15px' }}>Embark on a journey of innovation with our latest IT products, meticulously crafted to redefine and elevate your online experience. Explore the forefront of technology as we introduce revolutionary solutions designed to meet the evolving demands of the digital era.</p>
                    <a href="#" onClick={() => navigate('/home')} style={{ fontSize: '20px' }} class="btns">Shop now</a>
                </div>
            </div>
        </>
    )
}

export default MyHome