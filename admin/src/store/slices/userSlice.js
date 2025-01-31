import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")) ||  null,
    loading: false,
    error: null
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state, action) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload))
            state.error = null;
        }, loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null;
            localStorage.removeItem("user")
        }
    }

})
export const {loginStart,loginSuccess,loginFail,logout} = userSlice.actions
export default userSlice.reducer