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
                    <span style={{ fontSize: '30px' }}>Empower Your Digital Journey with Innovative Technology</span>
                    <p style={{ fontSize: '15px' }}>Embark on a path of creativity and progress with our cutting-edge IT solutions. Immerse yourself in the latest technological advancements designed to redefine and enhance your online presence. Join us at the forefront of innovation as we unveil groundbreaking solutions tailored to meet the dynamic demands of the digital era.</p>
                    <a href="#" onClick={() => navigate('/home')} style={{ fontSize: '20px' }} className="btns">Shop Now</a>

                </div>
            </div>
        </>
    )
}

export default MyHome