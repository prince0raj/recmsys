import { useEffect, useState } from 'react'
import './navbar.css'
import { Link, useLocation } from 'react-router-dom'
// import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { getSerchedCityBoundary } from '../../services/Services';
import useDataContext from '../../Context/UseContext';
const Navbar = () => {
    // @ts-ignore
    const { setcenterCordinates } = useDataContext();
    const [listofcity, setListofcity] = useState([]);
    const [city, setCity] = useState("");
    const [tooglSearch, setToggleSearch] = useState(false);

    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setToggleSearch(true);
        } else {
            setToggleSearch(false);
        }
    }, [location.pathname]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        getSerchedCityBoundary(city, (err: any, res) => {
            if (err) {
                console.log(err);
            } else {
                const citylist: any = res.data;
                const newCityList = citylist.map((val: { display_name: string, boundingbox: number[], lat: number, lon: number }) => ({
                    display_name: val.display_name,
                    cordinates: {
                        lat: val.lat,
                        lon: val.lon
                    }
                }));
                setListofcity(newCityList);
            }
            return;
        })
    }
    const handleChange = async (e: any) => {
        setCity(e.target.value);
    }
    const handelclick = (val: any) => {
        setcenterCordinates(val.cordinates);
        setListofcity([]);
        setCity('');
    }


    return (
        <div className='Navbar-container'>
            <div className="Navbar-wraper">
                <div className="nav-left">
                    <div className="com-logo">
                        <img src='https://salescode.ai/wp-content/uploads/2023/05/logo-new.svg' style={{ width: '200px' }} alt="Salescode.ai" />
                    </div>
                </div>
                <div className="nav-mid">
                    <ul className="itemlists">
                        <Link to='/'>
                            <li>map</li>
                        </Link>
                        <Link to='/status'>
                            <li>status</li>
                        </Link>
                        {/* <Link to='/'>
                            <li>services</li>
                        </Link> */}
                    </ul>
                </div>
                <div className="nav-right">
                    <div className="search-place">
                        {tooglSearch ?
                            <div className="input-form">
                                <IoSearchSharp />
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Search city' value={city} onChange={handleChange} />
                                </form>
                                <div className="dropListCity">
                                    <ul className='listOfCity'>
                                        {listofcity ? listofcity.map((val, ind) => (
                                            <li key={ind} onClick={() => handelclick(val)}>
                                                {/* @ts-ignore */}
                                                {val.display_name}
                                            </li>
                                        )) : null}
                                    </ul>


                                </div>
                                {/* <FaMapMarkerAlt color='#00c6b1' fontSize='1.2rem' /> */}
                            </div>
                            : ''}
                    </div>
                    <div className="profile">
                        <MdAccountCircle fontSize='2rem' />
                        <span>Prince Raj</span>
                    </div>
                    <button className="Btn">
                        <div className="sign">
                            <svg viewBox="0 0 512 512">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                            </svg>
                        </div>
                        <div className="text">Logout</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
