import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        loadProducts(state, action){
            state.products = [...action.payload]
        },
    }
})

export const {loadProducts} = productSlice.actions;

export default productSlice.reducer;