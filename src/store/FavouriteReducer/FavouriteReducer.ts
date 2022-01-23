import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFavourites, IProducts } from "../../interface/Interface";

interface IFavouriteState{
    ids: IFavourites[];
}

const rootState = {ids:[]} as IFavouriteState;

const favouriteSlice = createSlice({
    name:"favourite",
    initialState:rootState,
    reducers:{
        AddFavourites(state,action:PayloadAction<IFavourites[]>){
            state.ids = state.ids.concat(action.payload);
        },
        RemoveFavourites(state,action:PayloadAction<IFavourites>){
            if(state.ids.length <=1){
                state.ids = [];
            }else{
                const newState = state.ids.filter((item)=>{
                    if(item.id !==action.payload.id){
                        return item;
                    }
                })
                state.ids = newState;
            }
            
        }
    }
})

export default favouriteSlice.reducer;
export const {AddFavourites,RemoveFavourites} = favouriteSlice.actions