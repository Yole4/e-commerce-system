// import React, { useEffect, useState } from 'react'
import axios from 'axios';

// images
import givenImage from '../assets/images/given image.png';

// react icons  
import { AiTwotoneHome, AiOutlineCloseCircle } from "react-icons/ai";
import { VscDeviceCamera } from "react-icons/vsc";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { backendUrl } from '../utils/Services';
import { PublicContext } from '../context/PublicContext';
import { BsPersonCircle } from "react-icons/bs";
import { AdminContext } from '../context/AdminContext';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const { logoutUser, user, isLogout, cartList, setIsCart, setIsLogout, isLoading, errorResponse, userCredentials, changePasswordData, setChangePasswordData, isChangePassword, setIsChangePassword,
        updateProfile, handleChangePassword, myNotifications, isEditProfileName, setIsEditProfileName, handleEditProfileName, names, setNames
    } = useContext(AuthContext);

    const { publicLoading } = useContext(PublicContext);

    const { settingsData } = useContext(AdminContext);

    const [isErrorResponse, setIsErrorResponse] = useState(false);
    const [isProfile, setIsProfile] = useState(false);

    useEffect(() => {
        if (errorResponse) {
            setIsErrorResponse(true);

            setTimeout(() => {
                setIsErrorResponse(false);
            }, 5000);
        }
    }, [errorResponse]);

    // ---------------------------- CHECK IF LOGIN OR NOT -----------------------------
    const [islogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (user) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [user]);

    // header profile
    const [isProfileIcon, setIsProfileIcon] = useState(false);
    const [isMyNot, setIsMyNot] = useState(false);

    return (
        <div onClick={() => { setIsProfileIcon(false); setIsMyNot(false) }}>

            <nav className="main-header navbar navbar-expand headerColor" style={{ marginLeft: '0', color: '#FFFFFF' }}>
                <ul className="navbar-nav" style={{ display: 'flex', alignItems: 'center' }}>

                    <li className="nav-item" style={{ marginTop: '-7px' }}>
                        <a className="nav-link"><img src={settingsData && `${backendUrl}/${settingsData.image}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} alt="" /></a>
                    </li>

                    <li className="nav-item d-sm-inline-block" style={{ marginLeft: '-20px' }}>
                        <span style={{ cursor: 'pointer', color: '#FFFFFF' }} className="nav-link">{settingsData && settingsData.title}</span>
                    </li>

                </ul>

                <ul className="navbar-nav ml-auto" style={{ gap: '20px' }}>
                    <li className="nav-item d-sm-inline-block" style={{
                        textDecoration: location.pathname === "/" ? 'underline' : '',
                        color: location.pathname === "/" && 'orange'
                    }}>
                        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')} className="nav-link">Home</span>
                    </li>
                    <li className="nav-item d-sm-inline-block" style={{
                        textDecoration: location.pathname === "/home" ? 'underline' : '',
                        color: location.pathname === "/home" && 'orange'
                    }}>
                        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/home')} className="nav-link">Products</span>
                    </li>

                    {userCredentials && userCredentials.user_type === "Customer" && (
                        <>
                            <li className="nav-item d-sm-inline-block" style={{
                                textDecoration: location.pathname === "/user-orders" ? 'underline' : '',
                                color: location.pathname === "/user-orders" && 'orange'
                            }}>
                                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/user-orders')} className="nav-link">Orders</span>
                            </li>
                            <li className="nav-item d-sm-inline-block" style={{
                                textDecoration: location.pathname === "/address" ? 'underline' : '',
                                color: location.pathname === "/address" && 'orange'
                            }}>
                                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/address')} className="nav-link">Address</span>
                            </li>
                        </>
                    )}

                    <li className="nav-item d-sm-inline-block" style={{
                        textDecoration: location.pathname === "/about" ? 'underline' : '',
                        color: location.pathname === "/about" && 'orange'
                    }}>
                        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/about')} className="nav-link">About Me</span>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">

                    {islogin && (
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#">
                                <i className="far fa-bell" style={{ color: '#FFFFFF' }} />
                                <span className="badge badge-warning navbar-badge">{myNotifications?.length === 0 ? '' : myNotifications?.length}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right notificationAlign">
                                <span className="dropdown-item dropdown-header">{myNotifications && myNotifications.length} Notification</span>


                                <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                                    {myNotifications && myNotifications.reverse().map(item => (
                                        <div key={item.id} className='dropdown-item other' style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: item.seen === 0 ? 'rgba(131, 131, 131, 0.20)' : '' }}>
                                            <div style={{ display: 'flex' }}>
                                                <i className="fas fa-bell mr-2" style={{ color: 'rgba(80, 66, 66, 0.935)', fontSize: '15px', marginTop: '5px' }} /><p style={{ marginLeft: '10px' }}>{item.content}</p>
                                            </div>
                                            <div style={{ marginLeft: '10px' }}>
                                                <p style={{ marginLeft: 22, fontSize: 10, color: 'rgb(105, 96, 96)' }}>{item.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="dropdown-divider" />
                                <a data-toggle="modal" data-target="#allNotification" style={{ cursor: 'pointer' }} className="dropdown-item dropdown-footer">See All Notifications</a>
                            </div>
                        </li>
                    )}

                    {userCredentials?.user_type === "Customer" && location.pathname === "/home" && (
                        <li className="nav-item dropdown" onClick={() => islogin ? setIsCart(true) : navigate('/login')}>
                            <div className="nav-link">
                                <MdOutlineShoppingCart style={{ cursor: 'pointer', color: '#FFFFFF' }} size={20} />
                                <span className="badge badge-warning navbar-badge">{cartList?.length === 0 ? '' : cartList?.length}</span>
                            </div>
                        </li>
                    )}

                    {islogin && (
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small" style={{ color: '#FFFFFF' }}>{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</span>
                                <img style={{ width: 25, height: 25 }} className="img-profile rounded-circle" src={userCredentials && userCredentials.given_image ? `${backendUrl}/${userCredentials.given_image}` : givenImage} />
                            </a>

                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a className="dropdown-item" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }} onClick={() => setIsProfile(true)}><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                    Profile
                                </a>
                                {userCredentials?.user_type === "Admin" && (
                                    <a className="dropdown-item" data-toggle="modal" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}><i className="nav-icon fas fa-tachometer-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Dashboard
                                    </a>
                                )}
                                <a className="dropdown-item" data-toggle="modal" data-target="#change_password" style={{ cursor: 'pointer' }} onClick={() => setIsChangePassword(true)}><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                    Change Password
                                </a>
                                <a className="dropdown-item" data-toggle="modal" data-target="#logout" style={{ cursor: 'pointer' }} onClick={() => setIsLogout(true)}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                    Logout
                                </a>
                            </div>
                        </li>
                    )}

                    {!islogin && (
                        <li className="nav-item dropdown" onClick={(e) => { e.stopPropagation(); navigate('/login') }}>
                            <a className="nav-link" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small" style={{ color: '#FFFFFF' }}>Login</span>
                                <BsPersonCircle style={{ cursor: 'pointer', color: '#FFFFFF' }} size={20} />
                            </a>
                        </li>
                    )}
                </ul>
            </nav>

            {/* Change Password */}
            {isChangePassword && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isChangePassword ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span>Change Password</span>
                        </div>
                        <hr />
                        <form onSubmit={handleChangePassword}>
                            <div className='form-div'>
                                <label htmlFor="">Username</label>
                                <input type="text" value={changePasswordData.username} onChange={(e) => setChangePasswordData((prev) => ({ ...prev, username: e.target.value }))} className='form-control' placeholder='Username' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Current Password</label>
                                <input type="password" value={changePasswordData.password} onChange={(e) => setChangePasswordData((prev) => ({ ...prev, password: e.target.value }))} className='form-control' placeholder='*********' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">New Password</label>
                                <input type="password" value={changePasswordData.newPassword} onChange={(e) => setChangePasswordData((prev) => ({ ...prev, newPassword: e.target.value }))} className='form-control' placeholder='*********' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Confirm Password</label>
                                <input type="password" value={changePasswordData.confirmPassword} onChange={(e) => setChangePasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))} className='form-control' placeholder='*********' required />
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsChangePassword(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* -----------------------LOGOUT CONFIRMATION---------------------- */}
            {isLogout && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isLogout ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Logout?</h5>
                        </div>
                        <hr />
                        <div className='form-div'>
                            <span>Are you sure you wan't to logout?</span>
                        </div>

                        <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                            <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsLogout(false)}>No</button>
                            <button className='btn btn-primary' type='submit' style={{ width: '80px' }} onClick={() => { logoutUser() }}>Yes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --------   PROFILE ---------- */}
            {isProfile && (
                <div className="popup" onClick={() => setIsProfile(false)}>
                    <div className="popup-bodys" onClick={(e) => e.stopPropagation()} style={{ animation: isProfile ? 'dropBottoms .3s linear' : '' }}>
                        <div className="modal-close" onClick={() => setIsProfile(false)}>
                            <AiOutlineCloseCircle size={30} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <img src={userCredentials && userCredentials.given_image ? `${backendUrl}/${userCredentials.given_image}` : givenImage} style={{ borderRadius: '50%', height: '150px', width: '150px' }} />
                            <label htmlFor="uploadPhoto" style={{ marginLeft: '-40px', cursor: 'pointer', zIndex: '3', color: 'white', position: 'absolute', marginTop: '110px' }}>
                                <VscDeviceCamera size={30} style={{ backgroundColor: 'rgb(71, 71, 98)', padding: '3px', borderRadius: '50%' }} />
                                <input type="file" id="uploadPhoto" onChange={(e) => updateProfile(e.target.files[0])} style={{ display: 'none' }} />
                                {/* <input type="file" id="uploadPhoto" onChange={(e) => setAutoImage(e.target.files[0])} style={{ display: 'none' }} /> */}
                            </label>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div>
                                <h2 style={{ fontSize: '20px' }}>{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</h2>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <span>{userCredentials && userCredentials.user_type}</span>
                            </div><br />
                        </div>
                        <hr />
                        <div style={{ margin: '10px 10px 0px 10px' }}>
                            <button onClick={() => { setNames({ firstName: userCredentials.first_name, middleName: userCredentials.middle_name, lastName: userCredentials.last_name }); setIsEditProfileName(true) }} style={{ width: '100%', padding: '5px', borderRadius: '5px', fontSize: '17px', color: 'black' }}>Edit Profile</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --------   Notification ---------- */}
            {isMyNot && (
                <div style={{ position: 'fixed', top: '50px', right: '10%', background: 'whitesmoke', fontSize: '17px', borderRadius: '4px', zIndex: '3000', overflow: 'auto' }}>
                    <div>
                        <span className="dropdown-item dropdown-header">{myNotifications && myNotifications.length} Notification</span>


                        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                            {myNotifications && myNotifications.reverse().map(item => (
                                <div key={item.id} className='dropdown-item other' style={{ fontSize: '12px', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex' }}>
                                        <i className="fas fa-bell mr-2" style={{ color: 'rgba(80, 66, 66, 0.935)', fontSize: '15px', marginTop: '5px' }} /><p style={{ marginLeft: '10px' }}>{item.content}</p>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <p style={{ marginLeft: 22, fontSize: 10, color: 'rgb(105, 96, 96)' }}>{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="dropdown-divider" />
                        <a data-toggle="modal" data-target="#allNotification" style={{ cursor: 'pointer' }} className="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </div>
            )}

            {/* Change profile info */}
            {isEditProfileName && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isEditProfileName ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span>Change Profile</span>
                        </div>
                        <hr />
                        <form onSubmit={handleEditProfileName}>
                            <div className='form-div'>
                                <label htmlFor="">First Name</label>
                                <input type="text" value={names.firstName} onChange={(e) => setNames((prev) => ({ ...prev, firstName: e.target.value }))} className='form-control' placeholder='First Name' required />
                            </div>

                            <div className='form-div'>
                                <label htmlFor="">Middle Name</label>
                                <input type="text" value={names.middleName} onChange={(e) => setNames((prev) => ({ ...prev, middleName: e.target.value }))} className='form-control' placeholder='Middle Name' required />
                            </div>

                            <div className='form-div'>
                                <label htmlFor="">Last Name</label>
                                <input type="text" value={names.lastName} onChange={(e) => setNames((prev) => ({ ...prev, lastName: e.target.value }))} className='form-control' placeholder='Last Name' required />
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsEditProfileName(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* profile list */}
            {isProfileIcon && (
                <div style={{ position: 'fixed', top: '50px', right: '5%', padding: '20px 1% 20px 20px', background: 'whitesmoke', fontSize: '17px', borderRadius: '4px', zIndex: '3000' }}>
                    <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => setIsProfile(true)}><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Profile
                    </a>
                    <a className="dropdown-item" style={{ cursor: 'pointer', marginTop: '5px' }} onClick={() => navigate('/')}><i className="fa-sm fa-fw mr-2 text-gray-400" ><AiTwotoneHome size={18} style={{ color: 'black', marginTop: '-3px' }} /></i>
                        Home
                    </a>
                    {userCredentials && userCredentials.user_type === "Admin" && (
                        <a className="dropdown-item" style={{ cursor: 'pointer', marginTop: '5px' }} onClick={() => navigate('/dashboard')}><i className="fa-sm fa-fw mr-2 text-gray-400" ><AiTwotoneHome size={18} style={{ color: 'black', marginTop: '-3px' }} /></i>
                            Dashboard
                        </a>
                    )}
                    <a className="dropdown-item" style={{ cursor: 'pointer', marginTop: '5px' }} onClick={() => setIsChangePassword(true)}><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Change Password
                    </a>
                    <a className="dropdown-item" style={{ cursor: 'pointer', marginTop: '5px' }} onClick={() => setIsLogout(true)}>
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                    </a>
                </div>
            )}

            {/* Loading div */}
            {isErrorResponse && errorResponse ? (
                <div className='error-respond' style={{ backgroundColor: errorResponse.isError ? '#fb7d60' : '#7b4ae4' }}>
                    <div>
                        <h5>{errorResponse.message}</h5>
                    </div>
                </div>
            ) : (
                <></>
            )}

            {/* fetching data screen */}
            {isLoading || publicLoading && (
                <div className="popup">
                    <div className="modal-pop-up-loading">
                        <div className="modal-pop-up-loading-spiner"></div>
                        <p>Loading...</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header
