import React, { useContext } from 'react'
import Header from '../Header'
import { AuthContext } from '../../context/AuthContext'


function Address() {
    const { addressData, setAddressData, myAddressList, setIsAddAddress, isAddAddress, handleAddAddress } = useContext(AuthContext);
    return (
        <div>
            <Header />
            <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', width: '70%' }}>

                <div className="popup-edit" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '25px' }}>
                    <span>My Address</span>
                    <button className='btn btn-primary' style={{width: '150px', fontSize: '15px'}} onClick={() => setIsAddAddress(true)}>Add new address</button>
                </div>


                <hr />
                <div className="form-div" style={{ fontSize: '15px' }} >
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Land Mark</th>
                                <th>Country</th>
                                <th>Zip Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myAddressList && myAddressList.length === 0 ? (
                                <div style={{ position: '', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '15px' }}>
                                    <span>No Address!</span>
                                </div>
                            ) : (
                                myAddressList && myAddressList.map((item, index) => (
                                    <tr key={item.id} style={{fontSize: '15px'}}>
                                        <td>{`${item.street}. ${item.barangay} ${item.municipality}, ${item.province}`}</td>
                                        <td>{`${item.land_mark}`}</td>
                                        <td>{`${item.country}`}</td>
                                        <td>{item.zip_code}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Address */}
            {isAddAddress && (
                <div className="popup" style={{ fontSize: '15px' }}>
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isAddAddress ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span style={{ fontWeight: 'bold' }}>Add Address</span>
                        </div>

                        <hr />

                        <form onSubmit={handleAddAddress}>
                            <div className='form-div'>
                                <label htmlFor="">Street</label>
                                <input type="text" className='form-control' value={addressData.street} onChange={(e) => setAddressData((prev) => ({ ...prev, street: e.target.value }))} placeholder='e.g. Sta. Cruz' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Village (Barangay)</label>
                                <input type="text" className='form-control' value={addressData.barangay} onChange={(e) => setAddressData((prev) => ({ ...prev, barangay: e.target.value }))} placeholder='e.g. Libertad' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Municipality/City</label>
                                <input type="text" className='form-control' value={addressData.municipality} onChange={(e) => setAddressData((prev) => ({ ...prev, municipality: e.target.value }))} placeholder='e.g. Dapitan City' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Province/State</label>
                                <input type="text" className='form-control' value={addressData.province} onChange={(e) => setAddressData((prev) => ({ ...prev, province: e.target.value }))} placeholder='e.g. Zamboanga Del Norte' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Postal Code/Zip Code</label>
                                <input type="number" className='form-control' value={addressData.zipCode} onChange={(e) => setAddressData((prev) => ({ ...prev, zipCode: e.target.value }))} placeholder='Zip Code' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Country</label>
                                <input type="text" className='form-control' value={addressData.country} onChange={(e) => setAddressData((prev) => ({ ...prev, country: e.target.value }))} placeholder='e.g. Philippines' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Land Mark (Additional Address Info)</label>
                                <input type="text" className='form-control' value={addressData.landMark} onChange={(e) => setAddressData((prev) => ({ ...prev, landMark: e.target.value }))} placeholder='e.g. Inside Rice Mailing Corporation' required />
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsAddAddress(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Address
