import React from "react";
import {connect} from "react-redux";
import CustomButton from "../custom-button/custom-button";
import './cart-dropdown.scss';
import CartItem from "../cart-item/cart-item";
import {selectCartItems} from "../../redux/cart/cart-selectors";
import {withRouter} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {toggleCartHidden} from "../../redux/cart/cart-actions";

const CartDropdown = ({cartItems, history, dispatch})=>(
    <div className="cart-dropdown">
        <div className="cart-items">
            { cartItems.length ? cartItems.map(e => (
                <CartItem key={e.id} item={e}/>
            )): <span className="empty-message">Your cart is empty</span>}

        </div>
        <CustomButton onClick={() => {
            history.push('/checkout')
            dispatch(toggleCartHidden())
        }}> GO TO CHECKOUT </CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
   cartItems: selectCartItems
});


export default withRouter(connect(mapStateToProps)(CartDropdown));