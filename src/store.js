import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice.js'

export let {changeName,changeAge} = user.actions;

let cartList = createSlice({
    name: 'cartList',
    initialState: 
    [
        {id : 0, name : "white and Black", count : 2},
        {id : 2, name : "Grey Yordan", count : 1}
    ],
    reducers: {
        increseCount(state, action ){
            alert(action.payload)
            // state.find( x => x.id == action.payload).count += 1;
            let num = state.findIndex((a) => {return a.id == action.payload})
            state[num].count++;
        },
        addItem(state, action) {
            
            console.log(action.payload)
            let count = 0;
            state.find( (a) => {
                if(a.id == action.payload.id){
                    count++;                    
                }
            })
            
            if(count < 1){
                state.push(action.payload);
            }else {
                let num = state.findIndex((a) => {return a.id == action.payload.id})
                state[num].count++;
            }
            
        }
    }
})

export let { increseCount, addItem } = cartList.actions;

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cartList.reducer
    }
})