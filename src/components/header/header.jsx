import React from "react";
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import CartIcon from "../cart-icon/cart-icon";
import {selectCartHidden} from "../../redux/cart/cart-selectors";
import {selectCurrentUser} from "../../redux/user/user-selector";

import "./header.scss";
import CartDropdown from "../cart-dropdown/cart-dropdown";



const Header = ({currentUser, hidden}) => (

    <div className="header">
        <Link className="logo-container"  to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">SHOP</Link>
            <Link className="option" to="/contact">CONTACT</Link>
            {currentUser ?
            <div className="option" onClick={()=>auth.signOut()}>SIGN OUT</div> :
            <Link className="option" to="/signin">SIGN IN</Link>}
            <CartIcon />
        </div>
        {console.log("hidden value: ", hidden)}
        {

            hidden ?  null : <CartDropdown />
        }

    </div>

);

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
   currentUser: currentUser, hidden: hidden
});

export default connect(mapStateToProps)(Header);