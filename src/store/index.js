import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/user';
import productReducer from './slices/product';
import cartReducer from './slices/cart';

const store = configureStore({

    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
    }

})

export default store