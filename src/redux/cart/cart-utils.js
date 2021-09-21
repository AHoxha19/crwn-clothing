export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );
    if(existingCartItem){
        return cartItems.map(c =>
            c.id === cartItemToAdd.id ?
                {...c, quantity: c.quantity+1} :
                c
        );
    }
    return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);
    if(existingCartItem.quantity === 1){
        return cartItems.filter((e)=>e.id !== cartItemToRemove.id);
    }
    return cartItems.map((e)=> e.id === cartItemToRemove.id ?
        {...e, quantity: e.quantity-1}: e);
}