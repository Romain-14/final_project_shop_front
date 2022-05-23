export const calculateTotalAmount = (cart) => {    
    let totalPrice = 0;
    cart.forEach(product => {
        let total = parseFloat(product.price) * parseInt(product.quantity);
        totalPrice += total
    });
    return totalPrice;
}

export const addToCart = (cart, productToAdd, quantity) => {
    let index = cart.findIndex((c) => c.product_ID === productToAdd.product_ID);
    // 
    let cartCopy = JSON.parse(JSON.stringify(cart));
    if(index === -1){
        productToAdd = {...productToAdd, quantity};
        cartCopy = [...cartCopy, productToAdd];
    } else {
        cartCopy[index].quantity += parseInt(quantity);
    }
    
    let cartLS = JSON.stringify(cart);
    localStorage.setItem("cart", cartLS);

    return cartCopy;
}

export const updateCart = (cart, productToUpdate, type, quantity) => {
    console.log(quantity)
    let index = cart.findIndex((c) => c.product_ID === productToUpdate.product_ID);
    // 
    let cartCopy = JSON.parse(JSON.stringify(cart));
    if(index === -1){
        throw Error('Erreur qui ne devrait pas :| !')
    } else {
        if(type === "plus") cartCopy[index].quantity += parseInt(quantity);
        if(type === "moins") cartCopy[index].quantity -= parseInt(quantity);
    }
    
    let cartLS = JSON.stringify(cart);
    localStorage.setItem("cart", cartLS)

    return cartCopy;
}