import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        name: 'Nicholas Ardhyka',
        email: 'nicholasardhika@gmail.com',
        phone: '000000',
        address: 'jl. jalan',
        photo: "",
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setPhoto: (state, action) => {
            state.photo = action.payload;
        }
    }
})

export const {setName, setEmail, setPhone, setAddress, setPhoto} = profileSlice.actions
export default profileSlice.reducer