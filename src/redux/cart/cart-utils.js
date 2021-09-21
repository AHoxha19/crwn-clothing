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