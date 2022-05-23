import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalAmount } from "../../helpers/cartUtils";

const cartLS = JSON.parse(localStorage.getItem('cart')) === null ? [] : JSON.parse(localStorage.getItem('cart'));

const initialState = {
    cart: cartLS,
    totalPrice: calculateTotalAmount(cartLS),
}

console.log(initialState)
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        modifyCart(state, action){
            console.log('action.payload',action.payload)
            state.cart = action.payload.cart;
            state.totalPrice = action.payload.totalPrice;
        },
        cleanCart(state, action){
            state.cart = [];
            state.totalPrice = 0;
        },
    }
})

export const {modifyCart, cleanCart} = cartSlice.actions;

export default cartSlice.reducer;