import React from 'react'
import './map.css'
import { IoStorefront } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
const PopupDetails = (props: any) => {
    const { outlet } = props;
    const payload = JSON.parse(outlet.payload);
    return (
        <div className='popup-container'>
            <div className="popup_wrapper">
                <div className="top-popUp">
                    <IoStorefront fontSize='5rem' />
                    <h3>{outlet?.name}</h3>
                </div>
                <div className="desc-popupmap">
                    <div className="totalReview">
                        <p>{JSON.parse(outlet?.review).rating}</p>
                    </div>
                    <p>{outlet?.address}</p>
                    <div className="listofdesc">
                        <p>{outlet?.category}</p>
                        {outlet?.phone_number &&
                            <p>-</p>
                        }
                        {outlet?.phone_number &&
                            <p className='phonenumber-map'><IoIosCall /> {outlet?.phone_number}</p>
                        }
                    </div>
                </div>
                <div className="visiturlgoogle">
                    <a href={payload?.googleUrl} target='_blank'>
                        <button className="learn-more">
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow" />
                            </span>
                            <span className="button-text">view on G-map</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PopupDetails
