import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged : false,
    userInfos: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signIn(state, action){
            console.log(action)
            state.isLogged = true;
            state.userInfos = action.payload
        },
        signOut(state, action){
            state.isLogged = false;
            state.userInfos = [];
        }
    }
})

export const {signIn, signOut} = userSlice.actions;

export default userSlice.reducer;