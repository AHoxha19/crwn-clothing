import React from "react";
import StripeCheckout from "react-stripe-checkout";


const StripeButton = ({price}) =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_X80RIfFLF0mnH1t5vfORPuAq00Z10XlX4u';

    const onToken = token=>{
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeButton;