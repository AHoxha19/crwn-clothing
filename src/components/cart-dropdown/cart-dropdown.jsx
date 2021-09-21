import React from "react";
import {connect} from "react-redux";
import CustomButton from "../custom-button/custom-button";
import './cart-dropdown.scss';
import CartItem from "../cart-item/cart-item";
import {selectCartItems} from "../../redux/cart/cart-selectors";

const CartDropdown = ({cartItems})=>(
    <div className="cart-dropdown">
        <div className="cart-items">
            {cartItems.map(e => (
                <CartItem key={e.id} item={e}/>
            ))}

        </div>
        <CustomButton> GO TO CHECKOUT </CustomButton>
    </div>
)

const mapStateToProps = state => ({
   cartItems: selectCartItems(state)
});


export default connect(mapStateToProps)(CartDropdown);