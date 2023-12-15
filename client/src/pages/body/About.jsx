import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import { AuthContext } from '../../context/AuthContext';
import { CiEdit } from "react-icons/ci";

function About() {
    const { userCredentials, handleUpdateAbout, isAboutMe, setIsAboutMe, about, setAbout, errorResponse, phoneNumber, setPhoneNumber, isPhoneNumber, setIsPhoneNumber, handlePhoneNumber, email, setEmail, isEmail, setIsEmail, handleEmail } = useContext(AuthContext);

    const [isErrorResponse, setIsErrorResponse] = useState(false);

    useEffect(() => {
        if (errorResponse) {
            setIsErrorResponse(true);

            setTimeout(() => {
                setIsErrorResponse(false);
            }, 5000);
        }
    }, [errorResponse]);
    return (
        <>
            <Header />
            <div className="content-wrapper pt-5 about-container" style={{ color: 'black', marginLeft: '0', minHeight: 'calc(100vh - 57px)', background: 'pink' }}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="col-12">
                            <div className="row my-5 ">
                                <div className="col-md-5">
                                    <div className="card card-outline card-navy rounded-0 shadow">
                                        <div className="card-header">
                                            <h4 className="card-title">Contact</h4>
                                        </div>
                                        <div className="card-body rounded-0">
                                            <dl>
                                                <div>
                                                    <span style={{ cursor: 'pointer', position: 'absolute', right: '30px' }} onClick={() => setIsEmail(true)}><CiEdit size={20} /></span>
                                                    <dt className="text-muted"><i className="fa fa-envelope" /> Email</dt>
                                                </div>
                                                <dd className="pr-4">{userCredentials?.email}</dd>
                                                <div>
                                                    <span style={{ cursor: 'pointer', position: 'absolute', right: '30px' }} onClick={() => setIsPhoneNumber(true)}><CiEdit size={20} /></span>
                                                    <dt className="text-muted"><i className="fa fa-phone" /> Contact #</dt>
                                                </div>
                                                <dd className="pr-4">{userCredentials?.phone_number}</dd>
                                                <dt className="text-muted"><i className="fa fa-map-marked-alt" /> User Type</dt>
                                                <dd className="pr-4">{userCredentials?.user_type}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="card rounded-0 card-outline card-navy shadow">
                                        <div className="card-body rounded-0">
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <h2 className="text-center">About</h2>
                                                <span style={{ cursor: 'pointer', position: 'absolute', right: '30px' }} onClick={() => setIsAboutMe(true)}><CiEdit size={25} /></span>
                                            </div>
                                            <center>
                                                <hr className="bg-navy border-navy w-25 border-2" />
                                            </center>
                                            <div>
                                                <p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0, textAlign: 'justify' }}>{userCredentials?.about_me}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* update about me */}
            {isAboutMe && (
                <div className="popup" style={{ fontSize: '15px' }}>
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isAboutMe ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span style={{ fontWeight: 'bold' }}>About Me</span>
                        </div>

                        <hr />

                        <form onSubmit={handleUpdateAbout}>
                            <div className='form-div'>
                                <textarea cols="30" rows="5" className='form-control' value={about} onChange={(e) => setAbout(e.target.value)} placeholder='Say something about you...' required></textarea>
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsAboutMe(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* update phone number */}
            {isPhoneNumber && (
                <div className="popup" style={{ fontSize: '15px' }}>
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isPhoneNumber ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span style={{ fontWeight: 'bold' }}>Contact Number</span>
                        </div>

                        <hr />

                        <form onSubmit={handlePhoneNumber}>
                            <div className='form-div'>
                                <input type="number" className='form-control' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='+63' required />
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsPhoneNumber(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* update Email */}
            {isEmail && (
                <div className="popup" style={{ fontSize: '15px' }}>
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isEmail ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span style={{ fontWeight: 'bold' }}>Email</span>
                        </div>

                        <hr />

                        <form onSubmit={handleEmail}>
                            <div className='form-div'>
                                <input type="text" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your@gmail.com' required />
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsEmail(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Update</button>
                            </div>
                        </form>
                    </div>
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
        </>
    )
}

export default About
