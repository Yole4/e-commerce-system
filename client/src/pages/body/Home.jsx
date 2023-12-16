import React, { useContext, useEffect, useState } from 'react';

import '../../assets/css/Home.css';

// images
import givenImage from '../../assets/images/given image.png';

import { useNavigate } from 'react-router-dom';

// react icons
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineCloseCircle, AiOutlineMinus, AiOutlinePlus, AiFillLike, AiFillShop } from "react-icons/ai";
import { VscDeviceCamera } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";

import { AuthContext } from '../../context/AuthContext';
import { PublicContext } from '../../context/PublicContext';
import { backendUrl } from '../../utils/Services';
import { AdminContext } from '../../context/AdminContext';
import Header from '../Header';

function Home() {
  const navigate = useNavigate();

  const [isProfile, setIsProfile] = useState(false);
  const [isComments, setIsComments] = useState(false);

  // ---------------------------------- PARTIAL LOGIN --------------------------------
  const [isLogin, setIsLogin] = useState(false);


  // ------------------------------------  LOGIN SIDE---------------------------------------
  const { isLoading, errorResponse, user, logoutUser,
    userCredentials, isLogout, setIsLogout,
    updateProfile, handleAddToCart, isProductClick, setIsProductClick, cartList,
    isChangePassword, setIsChangePassword, changePasswordData, setChangePasswordData, handleChangePassword, myAddressList, placeOrderData, setPlaceOrderData,
    isPlaceOrder, setIsPlaceOrder, handlePlaceOrder, isCart, setIsCart, handleDeleteCart, setFeedbackData, setIsSelectProduct, commentsList,
    isEditProfileName, setIsEditProfileName, names, setNames, handleEditProfileName, i_like
  } = useContext(AuthContext); // require auth context

  const { categoryList, publicLoading, productListToSearch, homeSearch, setHomeSearch } = useContext(PublicContext);

  const [isErrorResponse, setIsErrorResponse] = useState(false);

  const { settingsData } = useContext(AdminContext);

  useEffect(() => {
    if (errorResponse) {
      setIsErrorResponse(true);

      setTimeout(() => {
        setIsErrorResponse(false);
      }, 5000);
    }
  }, [errorResponse]);

  // ---------------------------- CHECK IF LOGIN OR NOT -----------------------------
  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  // ---------------------------- GET EACH PRODUCT INFO -------------------------------
  const [eachProductInfo, setEachProductInfo] = useState({
    id: null,
    image: '',
    name: '',
    description: '',
    address: '',
    stock: null,
    prize: null,
    sold: null,
    ratings: null,
    date: ''
  });
  const productButton = async (item) => {
    setIsProductClick(isProductClick ? false : true);

    setEachProductInfo({
      id: item.id,
      image: item.image,
      name: item.name,
      description: item.description,
      address: item.address,
      stock: item.stock,
      prize: item.prize,
      sold: item.sold,
      ratings: item.ratings,
      date: item.date
    });
  }

  // ---------------------------------- SOLVE AMMOUNT --------------------------------
  const [quantity, setQuantity] = useState(0);
  const [ammount, setAmmount] = useState(0);
  // solve the ammount
  useEffect(() => {
    if (quantity !== 0) {
      setAmmount(eachProductInfo.prize * quantity);
    } else {
      setAmmount(0);
    }
  }, [quantity]);

  const [isCheckedMap, setIsCheckedMap] = useState({});
  const hasTrueValue = Object.values(isCheckedMap).includes(true);

  // Function to toggle the state of all checkboxes
  const handleToggleAllCheckboxes = () => {

    const hasTrueValue = Object.values(isCheckedMap).includes(true);
    const updatedMap = Object.fromEntries(
      Object.keys(isCheckedMap).map((key) => [key, !hasTrueValue])
    );

    setIsCheckedMap(updatedMap);
  };

  const handleCheckboxChange = (itemId) => {
    setQuantityMap((prev) => ({ ...prev, [itemId]: prev[itemId] || 1 }));

    setIsCheckedMap((prev) => {
      const updatedMap = { ...prev, [itemId]: !prev[itemId] };

      return updatedMap;
    });
  };

  // ----------------------------- check the checked item or product ----------------------------------------
  // get the checked item
  const getCheckedItems = () => {
    return Object.keys(isCheckedMap).filter((itemId) => isCheckedMap[itemId]);
  };

  useEffect(() => {
    if (isCheckedMap) {
      const checkedItems = getCheckedItems();
      // console.log('Checked Items:', checkedItems);
    }
  }, [isCheckedMap]);
  // ---------------------------------  SOLVE AMMOUNT ON CART -------------------------
  const [quantityMap, setQuantityMap] = useState({});
  const [totalsArray, setTotalsArray] = useState({});

  useEffect(() => {
    if (cartList) {
      // Initialize quantityMap and isCheckedMap based on cartList
      const initialQuantities = cartList.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});

      setQuantityMap(initialQuantities);

      const initialCheckedMap = cartList.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});

      setIsCheckedMap(initialCheckedMap);

      const initialTotalsArray = cartList.reduce((acc, item) => {
        acc[item.id] = 0; // Initialize total amount to 0
        return acc;
      }, {});

      setTotalsArray(initialTotalsArray);
    }
  }, [cartList]);

  useEffect(() => {
    if (quantityMap) {
      // Iterate over cartList and update totalsArray
      cartList?.forEach((item) => {
        const totalAmount = (quantityMap[item.id] || item.quantity) * item.prize;

        setTotalsArray((prevTotals) => ({
          ...prevTotals,
          [item.id]: totalAmount.toFixed(2),
        }));
      });
    }
  }, [quantityMap, isCheckedMap]);

  useEffect(() => {
    if (quantityMap) {
      const getCheckedIds = () => {
        return Object.keys(isCheckedMap).filter((id) => isCheckedMap[id]);
      };

      // Function to get totals based on checked IDs
      const getTotalsForCheckedIds = () => {
        const checkedIds = getCheckedIds();
        return checkedIds.map((id) => totalsArray[id]);
      };

      const getQuantityNumber = () => {
        const quantityId = getCheckedIds();
        return quantityId.map((id) => quantityMap[id]);
      }

      const getProductInfo = () => {
        const productInfoIds = getCheckedIds();
        const resultArray = [];
        const allArray = [];
        cartList?.map(item => {
          productInfoIds.map(productItem => {
            if (item.id === parseInt(productItem)) {
              resultArray.push(item.name);
              allArray.push(item);
            }
          })
        });
        setPlaceOrderData((prev) => ({ ...prev, productInfo: resultArray }));
        setPlaceOrderData((prev) => ({ ...prev, allData: allArray }));
      };
      getProductInfo();

      const totals = getTotalsForCheckedIds();
      const sum = totals.reduce((acc, value) => acc + parseFloat(value), 0);

      setPlaceOrderData((prev) => ({ ...prev, productIds: getCheckedIds() }));
      setPlaceOrderData((prev) => ({ ...prev, quantity: getQuantityNumber() }));
      setPlaceOrderData((prev) => ({ ...prev, eachAmount: getTotalsForCheckedIds() }));
      setPlaceOrderData((prev) => ({ ...prev, totalAmount: sum + 130 }));
    }
  }, [quantityMap, isCheckedMap, totalsArray]);

  //--------------------------------  BUTTON ADD TO CART  ---------------------------
  const buttonAddToCart = async () => {
    if (quantity > 0) {
      if (eachProductInfo?.stock >= quantity) {
        handleAddToCart(eachProductInfo.id, quantity);
      } else {
        alert(`Sorry our stock on this product is ${eachProductInfo.stock} left!`);
      }
    } else {
      alert('Please select the quantity');
    }
  }

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

      <div className='top-search'>
        <form>
          <div>
            <input type="search" className="form-control" value={homeSearch === "not" ? '' : homeSearch} onChange={(e) => setHomeSearch(e.target.value)} placeholder="Search Product" style={{ paddingLeft: '35px', borderRadius: '5px', height: '40px', fontSize: '15px' }} />
            <BiSearchAlt2 size={23} style={{ position: 'absolute', marginTop: '-30px', marginLeft: '8px' }} />
          </div>
        </form>
      </div>

      <div className='category-container'>
        <button onClick={() => setHomeSearch("not")} className={homeSearch === "not" ? 'category selected' : 'category'}>All</button>
        {categoryList?.map(item => (
          <button onClick={() => setHomeSearch(item.category_name)} key={item.id} className={item.category_name === homeSearch ? 'category selected' : 'category'}>{item.category_name}</button>
        ))}
      </div>

      <div className="">
        <div className="list">
          {productListToSearch?.length === 0 ? (
            <div style={{ fontSize: '18px', width: 'auto', height: 'auto', background: '#fff', padding: '20px', borderRadius: '15px', color: 'red' }}>
              <span>No Pruduct Found!</span>
            </div>
          ) : (
            productListToSearch?.map(item => (
              <div className="item" key={item.id}>
                <img src={`${backendUrl}/${item.image}`} alt />
                <div className="title">
                  {item.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }} className='price'>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <span style={{ textDecoration: 'line-through', color: '#7a7a7a' }}>₱{item.discount}</span>
                    <span>₱{item.prize}</span>
                  </div>
                  <span style={{ color: 'red' }}>Stock: {item.stock}</span>
                </div>

                <div className="ammount" style={{ textAlign: 'left' }}>

                  <ul style={{ display: 'flex', listStyle: 'none', margin: '10px 0 10px -40px', fontSize: '12px' }}>
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
                    <li style={{ marginLeft: '10px', color: 'red' }}>{item.sold} Sold</li>
                  </ul>
                </div>

                <button onClick={() => isLogin ? productButton(item) : navigate('/login')} style={{ borderRadius: '1px', padding: '3px', fontSize: '15px' }}>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </div>


      {/* --------   CART ---------- */}
      {isCart && (
        <div className="popup" onClick={() => setIsCart(false)}>
          <div className="popup-bodyss" onClick={(e) => e.stopPropagation()} style={{ background: 'rgb(93, 178, 206)', animation: isCart ? 'dropBottom .3s linear' : '' }}>
            <div className="modal-close" onClick={() => setIsCart(false)}>
              <AiOutlineCloseCircle size={30} />
            </div>
            {/* <span style={{color: 'red'}}>Cart is Empty!</span> */}
            <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>
              <span>My Cart</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'start', gap: '8px' }}>
              <input type="checkbox" onChange={handleToggleAllCheckboxes} style={{ height: '20px', width: '20px', cursor: 'pointer' }} />
              <AiFillShop size={20} />
              <span>{`${userCredentials?.first_name}'s`} Cart</span>
              <div style={{ position: 'absolute', right: '20px', color: 'darkred' }}>
                <span>Total: ₱{placeOrderData.totalAmount}</span>
              </div>
            </div>

            {cartList?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <span style={{ color: 'darkred' }}>Cart is Empty</span>
              </div>
            ) : (
              cartList?.map((item) => (
                <div key={item.id}>
                  <hr />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', marginLeft: '10px' }}>
                    <span style={{ color: 'darkred', fontSize: '15px' }}>
                      <span style={{ textDecoration: 'line-through', color: '#d2d2d2' }}>₱{item.discount}</span>{' '}
                      <span style={{ color: '' }}>₱{item.prize}</span>
                    </span>
                    <span style={{ fontSize: '15px' }}>{`₱${((quantityMap[item.id] || item.quantity) * item.prize).toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginLeft: '10px' }}>
                    <div style={{ display: 'flex', gap: '7px', justifyContent: 'center', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isCheckedMap[item.id] || false}
                        onChange={() => handleCheckboxChange(item.id)}
                        style={{ height: '20px', width: '20px', cursor: 'pointer' }}
                      />
                      <img src={`${backendUrl}/${item.image}`} alt="" style={{ width: '50px', height: '50px' }} />
                      <span>{item.name}</span>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <button
                        onClick={() =>
                          setQuantityMap((prev) => ({ ...prev, [item.id]: (prev[item.id] || item.quantity) - 1 }))
                        }
                        style={{ width: '40px', height: '40px', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <AiOutlineMinus />
                      </button>
                      <span
                        style={{
                          width: '40px',
                          height: '40px',
                          color: 'black',
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '3px',
                          padding: '2px',
                        }}
                      >
                        {quantityMap[item.id] || item.quantity}
                      </span>
                      <button
                        // onClick={() =>
                        //   setQuantityMap((prev) => ({ ...prev, [item.id]: (prev[item.id] || item.quantity) + 1 }))
                        // }
                        onClick={() => {
                          // Increase quantity, ensuring it doesn't exceed the available stock
                          setQuantityMap((prev) => {
                            const currentQuantity = prev[item.id] || item.quantity;
                            const newQuantity = currentQuantity + 1;
                
                            // Check if the new quantity exceeds the available stock
                            if (newQuantity <= item.stock) {
                              return {
                                ...prev,
                                [item.id]: newQuantity,
                              };
                            } else {
                              return prev;
                            }
                          });
                        }}
                        style={{ width: '40px', height: '40px', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>

                    <span>
                      <RiDeleteBin6Line onClick={() => handleDeleteCart(item)} size={20} style={{ color: 'darkred', cursor: 'pointer' }} />
                    </span>
                  </div>
                </div>
              ))
            )}

            <div style={{ marginTop: '15px' }}>
              <button onClick={() => hasTrueValue ? setIsPlaceOrder(true) : alert("No Item Selected!")} style={{ borderRadius: '10px', fontSize: '20px', background: hasTrueValue ? 'orange' : '', padding: '5px' }}>Check Out</button>
            </div>
          </div>
        </div>
      )}

      {/* --------   PRODUCT LIST ---------- */}
      {isProductClick && (
        <div className="popup" onClick={() => { setIsProductClick(false); setAmmount(0); setQuantity(0) }}>
          <div className="popup-body" onClick={(e) => e.stopPropagation()} style={{ animation: isProductClick ? 'dropBottom .3s linear' : '', background: 'rgb(93, 178, 206)' }}>
            <div style={{ minHeight: '100vh', overflow: 'auto' }}>
              <div className="modal-close" onClick={() => setIsProductClick(false)} id='comments'>
                <AiOutlineCloseCircle size={30} />
              </div>
              {/* <div style={{ fontWeight: 'bold' }}>
                <span>{eachProductInfo?.name}</span>
              </div> */}
              <div style={{ textAlign: 'center' }}>
                <img src={`${backendUrl}/${eachProductInfo?.image}`} style={{ width: '130px', height: '130px', borderRadius: '50%' }} alt="" />
              </div>
              <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '15px' }}>
                <span>{eachProductInfo.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center', marginTop: '4px', fontSize: '14px', color: 'darkred' }}>
                <span>Stock: {eachProductInfo?.stock}</span>
                {userCredentials?.user_type === "Customer" && (
                  <div style={{fontSize: '14px'}} >
                    <span>Ammount: </span>
                    <span>₱{ammount}</span>
                  </div>
                )}
              </div>
              <div style={{ margin: '10px 0', fontSize: '14px' }}>
                {eachProductInfo?.description}
              </div>

              {userCredentials?.user_type === "Customer" && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex' }}>
                    <button onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)} style={{ width: '40px', height: '40px', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><AiOutlineMinus /></button>
                    <span style={{ width: '40px', fontSize: '14px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3px', padding: '2px' }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ width: '40px', height: '40px', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><AiOutlinePlus /></button>
                  </div>
                  <div>
                    <button onClick={() => buttonAddToCart()} style={{ borderRadius: '20px', fontSize: '15px', width: '150px', padding: '8px', color: 'black', backgroundColor: quantity !== 0 ? 'orange' : '' }}>Add to cart</button>
                  </div>
                </div>
              )}

              {/* comments */}
              <div style={{ animation: isComments ? 'dropBottom .3s linear' : '', overflow: 'auto' }}>
                <hr style={{ borderColor: '#fff' }} />
                <div>
                  <span style={{fontSize: '14px'}}>Product Ratings and Comments</span>

                  {!commentsList || !commentsList.some(item => item.product_id === eachProductInfo.id) && (
                    <>
                      <hr style={{ borderColor: '#fff' }} />
                      <div style={{ textAlign: 'center', color: 'darkred', marginLeft: '-20px', fontSize: '14px' }}>
                        <span>No Comments Yet!</span>
                      </div>
                    </>
                  )}

                  {commentsList?.map(item => item.product_id === eachProductInfo.id && (
                    <>
                      <hr style={{ borderColor: '#fff' }} />
                      <div style={{ overflow: 'auto' }}>
                        <div style={{ display: 'flex' }}>
                          <img src={item.given_image && item.given_image.length > 0 ? `${backendUrl}/${item.given_image}` : givenImage} style={{ width: '60px', height: '60px', borderRadius: '50%' }} alt="" />
                          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                            <span style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '10px' }}>{`${item.first_name} ${item.middle_name} ${item.last_name}`}</span>
                            <ul style={{ display: 'flex', listStyle: 'none', color: '#ff9f43', marginLeft: '-40px', fontSize: '13.5px', marginBottom: '4px' }}>
                              <li><i className={item.ratings > 0 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 1 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 2 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 3 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 4 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 5 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 6 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 7 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 8 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 9 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              {/* <li style={{ color: '#fff', marginLeft: '10px' }}> | </li>
                              <li style={{ marginLeft: '10px', color: '#fff' }}>{item.name}</li> */}
                            </ul>
                            <span style={{ fontSize: '12px' }}>{item.date}</span>
                          </div>
                        </div>

                        <div style={{ marginLeft: '70px', marginTop: '20px', fontSize: '14px' }}>
                          <div style={{ width: '100%' }}>
                            <span>{item.comments}</span>
                          </div>
                          <div style={{ display: 'flex', fontSize: '15px', gap: '5px', marginTop: '8px' }}>
                            <AiFillLike style={{ cursor: 'pointer' }} size={20} onClick={() => i_like(item.id)} />
                            <span> {item.is_like}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
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

      {/* Change profile info */}
      {
        isEditProfileName && (
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
        )
      }

      {/* PLACE ORDER MODAL */}
      {isPlaceOrder && (
        <div className="popup">
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isPlaceOrder ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>
            <div className="modal-close" onClick={() => setIsPlaceOrder(false)}>
              <AiOutlineCloseCircle size={30} />
            </div>
            <div className="popup-edit">
              <span>Confirmation</span>
            </div>

            <hr />
            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label htmlFor="name" className="control-label">Address</label>
                <select className='form-control form-control-border' value={placeOrderData.address} onChange={(e) => setPlaceOrderData((prev) => ({ ...prev, address: e.target.value }))} required>
                  <option value="" selected disabled>Select Address</option>
                  {myAddressList?.map(item => (
                    <option key={item.id} value={`${item.street}. ${item.barangay} ${item.municipality}, ${item.province}`}>{`${item.street}. ${item.barangay} ${item.municipality}, ${item.province}`}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="name" className="control-label">Payment</label>
                <select className='form-control form-control-border' value={placeOrderData.paymentType} onChange={(e) => setPlaceOrderData((prev) => ({ ...prev, paymentType: e.target.value }))} required>
                  <option value="" selected disabled>Select Payment</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="G-Cash">G-Cash</option>
                </select>
              </div>

              {placeOrderData.eachAmount?.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginTop: '10px' }}>
                  <span>{placeOrderData.productInfo[index]}</span>
                  <span>Item: {placeOrderData.quantity[index]}</span>
                  <span>₱{placeOrderData.eachAmount[index]}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginTop: '10px' }}>
                <span>Shipping Fee</span>
                <span>₱130</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginTop: '10px' }}>
                <span>Discount</span>
                <span>₱0</span>
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span></span>
                <span style={{ color: 'red' }}>Total: ₱{placeOrderData.totalAmount}</span>
              </div>
              <br />
              <div>
                <button type='submit' style={{ borderRadius: '10px', fontSize: '20px', background: 'orange', padding: '5px' }}>Place Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
    </>
  )
}

export default Home
