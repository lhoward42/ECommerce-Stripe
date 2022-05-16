import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../cart-icon/cart-icon";
import './header.styles.scss';
import VintageTruck from '../../assets/vintagetruck.svg'



const Header = () => {
    return (
        <nav className="nav-menu container">   
            <div className="logo">
                <Link to='/'>Craft Me A Dream</Link>
                <img className="vintage-truck" src={VintageTruck} alt="Vintage" />
            </div>
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/shop">
                       Shop
                    </Link>
                </li>
                <li>
                 <CartIcon />   
                </li>
            </ul>
        </nav>  
    )
}

export default Header
