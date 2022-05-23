import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./ui/nav/Nav";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars, faUser, faMagnifyingGlass, faXmark, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Footer from "./Footer";

function Header() {
    const { isLogged, userInfos, cart } = useSelector((state) => ({
        ...state.user,
        ...state.cart
    }));

    const [toggle, setToggle] = useState(false)

    const toggleMenu = () => {
        setToggle(!toggle);
    }

    return (
        <header>
            {
                !toggle ? <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleMenu}/> 
                        : <Nav>
                            <FontAwesomeIcon icon={faXmark} size="2x" onClick={toggleMenu}/>    
                            <Link to={"/"} onClick={toggleMenu}>home</Link>
                            <Link to={"shop"} onClick={toggleMenu}>shop</Link>
                            {(isLogged && userInfos.role_id === 1) && <Link to={"admin"} onClick={toggleMenu}>ADMIN PANEL</Link>}                            

                            {isLogged && <Link to={"user/signout"} onClick={toggleMenu}>sign out</Link>}
                            <Footer/>
                         </Nav>
                       
            }
          
            <h1>Ship-Shop</h1>

            <nav className="nav-right">
                {isLogged && <Link to="cart" className="cart"><span className="nbr-item-inCart">{cart?.length}</span><FontAwesomeIcon icon={faCartShopping} size="2x" /></Link>}
                {
                    isLogged ? <Link to={userInfos.role_id === 1 ? "admin" : "user/dashboard" }><FontAwesomeIcon icon={faUser} size="2x"/></Link>
                             : <Link to={"user/signin" }><FontAwesomeIcon icon={faUser} size="2x"/></Link>
                }             
                
            </nav>

        </header>
    );
}

export default Header;