import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name: 'user',
    initialState: {name : 'kim', age : 20},
    reducers: { 
        changeName(state){
            // return {name : 'park' , age : 20}
            state.name = 'park'
        },
        changeAge(state, action){
            console.log(state)
            state.age += action.payload
        }
    }
})

export default user;
