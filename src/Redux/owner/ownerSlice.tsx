import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE ={
    ownername : "",
    ownerEmail : "",
    ownerId : " ",
    stadiumId : ""
}


const ownerSlice = createSlice({
    name : " owner",
    initialState : INITIAL_STATE,
    reducers : {
        ownerLogged : (state , action)=>{

        }
    }
})

export const {ownerLogged} = ownerSlice.actions
export default ownerSlice.reducer