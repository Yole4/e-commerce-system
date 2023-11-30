import React, { useContext } from 'react'
import Header from '../Header'
import { AuthContext } from '../../context/AuthContext'

import { AiOutlineCloseCircle } from "react-icons/ai";

function UserOrders() {

    const { myOrdersList, setFeedbackData, setIsRateMe, checkUpdate, isRateMe, eachComments, handleButtonFeedback, setCheckUpdate, feedbackData, handleAddFeedback, isSelectProduct, setIsSelectProduct } = useContext(AuthContext);

    // ------------------ button feedback -------------------
    const buttonFeedback = async (item) => {
        setIsSelectProduct(true);

        setFeedbackData((prev) => ({ ...prev, userId: item.user_id }));
        setFeedbackData((prev) => ({ ...prev, productId: item.product_id }));
        setFeedbackData((prev) => ({ ...prev, fullname: item.fullname }));
        setFeedbackData((prev) => ({ ...prev, id: item.id }));
    }
    
    return (
        <>
            <Header />


            <div style={{ marginTop: '80px', margin: '80px 20px 20px 20px', padding: '10px', borderRadius: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: 'black', fontSize: '25px' }}>My Orders</h1>
                </div>
                <div className='order-list'>
                    {myOrdersList?.length === 0 ? (
                        <div className="form-div" style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                            <span style={{ fontSize: '20px' }}>No Order Yet</span>
                        </div>
                    ) : (
                        myOrdersList?.map(item => (
                            <div key={item.id} className='order-items'>
                                {/* <hr style={{ border: '1px solid black' }} /> */}

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }} onClick={() => item.status === "Received" && setIsSelectProduct(true)}>
                                    <span style={{ fontSize: '12px' }}>Order Date: {item.date}</span>
                                    <span className="badge badge-success badge-pill" style={{ fontSize: '14px', color: '#fff', padding: '3px 10px', borderRadius: '15px', background: item.status === 'Pending' ? 'red' : item.status === 'To Ship' ? 'lightblue' : item.status === "To Receive" ? 'orange' : 'none' }}>{item.status === "Received" ? (<button style={{ fontSize: '14px', padding: '5px 14px', borderRadius: '5px', background: 'orange' }} onClick={() => buttonFeedback(item)}>Add Feedback</button>) : item.status}</span>
                                </div>
                                {item.product_info.split(',').map((product, index) => (
                                    <div key={index} style={{ marginLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                        <span>{product.trim()} (x{item.quantity.split(',').reverse()[index].trim()})</span>
                                        <span>₱{item.each_amount.split(',').reverse()[index].trim()}</span>
                                    </div>
                                ))}
                                <div style={{ marginLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginTop: '10px' }}>
                                    <span>Shipping Fee</span>
                                    <span>₱130</span>
                                </div>
                                <div style={{ marginLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                    <span>Discount</span>
                                    <span>₱0</span>
                                </div>
                                <hr />
                                <div style={{ marginLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                    <span></span>
                                    <span style={{ color: 'red' }}>Total: ₱{item.total_amount}</span>
                                </div>
                            </div>
                        ))
                    )}

                    {/* <br />
                <div>
                    <button className='btn btn-primary' style={{ width: '100%' }} onClick={() => setIsMyOrder(false)}>Okay</button>
                </div> */}
                </div>
            </div>

            {/* Rate */}
            {isRateMe && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isRateMe ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Feedback to {feedbackData.productName}</h5>
                        </div>
                        <hr />
                        <form onSubmit={handleAddFeedback}>
                            <div className='form-group'>
                                <label htmlFor="name" className="control-label">{checkUpdate ? 'Update' : 'Add'} Rate (1/10)</label>
                                <select className='form-control form-control-border' value={feedbackData.ratings} onChange={(e) => setFeedbackData((prev) => ({ ...prev, ratings: e.target.value }))} required>
                                    <option value="" selected disabled>Rate 1 out of 10</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name" className="control-label">{checkUpdate ? 'Update' : 'Add'} Comments</label>
                                <textarea value={feedbackData.comments} onChange={(e) => setFeedbackData((prev) => ({ ...prev, comments: e.target.value }))} className="form-control form-control-border" placeholder="You Comment" id="" cols="30" rows="4"></textarea>
                            </div>

                            {checkUpdate && (
                                <div style={{ margin: '-10px', padding: '0' }}>
                                    <button onClick={() => { setCheckUpdate(false); setFeedbackData((prev) => ({ ...prev, ratings: '' })); setFeedbackData((prev) => ({ ...prev, comments: '' })); }} style={{ fontSize: '12px', padding: '5px', borderRadius: '5px', background: 'transparent', color: 'darkblue' }}>Switch to add comment</button>
                                </div>
                            )}

                            <div style={{ justifyContent: 'space-between', marginTop: '10px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsRateMe(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>{checkUpdate ? 'Update' : 'Add'}</button>
                            </div>

                            <div className="form-div" style={{ fontSize: '12px', marginTop: '25px' }} >

                                {eachComments && eachComments.length === 0 ? (
                                    <span></span>
                                ) : (
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>Ratings</th>
                                                <th>Comments</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                eachComments && eachComments.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <div style={{ display: 'flex', listStyle: 'none', fontSize: '10px' }}>
                                                                <li><i className={item.ratings > 0 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 1 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 2 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 3 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 4 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 5 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 6 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 7 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 8 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                <li><i className={item.ratings > 9 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                            </div>
                                                        </td>
                                                        <td>{item.comments}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                                <a href="#" onClick={() => { setCheckUpdate(true); setFeedbackData((prev) => ({ ...prev, ratings: item.ratings })); setFeedbackData((prev) => ({ ...prev, productId: item.product_id })); setFeedbackData((prev) => ({ ...prev, comments: item.comments })); setFeedbackData((prev) => ({ ...prev, updateCommentId: item.id })); }}><span className="fa fa-edit text-primary" /> </a>
                                                                <div className="dropdown-divider" />
                                                                <a href="#" ><span className="fa fa-trash text-danger" /> </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                )}

                            </div >
                        </form >
                    </div >
                </div >
            )
            }

            {/* Choose Product */}
            {isSelectProduct && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isSelectProduct ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>
                        <div className="modal-close" onClick={() => setIsSelectProduct(false)}>
                            <AiOutlineCloseCircle size={30} />
                        </div>
                        <div className="popup-edit">
                            <h5>Select Product</h5>
                        </div>
                        <hr />
                        <form>
                            <div className='form-group'>
                                <ul>
                                    {/* {myOrdersList?.map(item => (
                    <li key={item.id} onClick={() => setIsRateMe(true)} style={{ cursor: 'pointer', margin: '10px 0 10px 0' }}>{item.product_info.split(',').map((product, index) => (
                      <span key={index}>{product.trim()}</span>
                    ))}</li>
                  ))} */}
                                    {myOrdersList?.map(item => item.id === feedbackData.id && (
                                        <li key={item.id}>
                                            {item.product_info.split(',').map((product, index) => (
                                                <li key={index} style={{ cursor: 'pointer', margin: '10px 0 10px 0' }}>
                                                    <a href='#' onClick={() => handleButtonFeedback(item.product_id.split(',')[index], item.product_info.split(',')[index])}>
                                                        {product}
                                                    </a>
                                                </li>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserOrders
