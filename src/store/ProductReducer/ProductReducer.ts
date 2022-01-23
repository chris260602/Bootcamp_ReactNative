import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFavourites, IProducts } from "../../interface/Interface";

interface ProductsState{
    products: IProducts[];
}

  const initialState = {products:[]} as ProductsState;

  const productSlice = createSlice({
      name:"Products",
      initialState,
      reducers:{
          saveProducts(state,action:PayloadAction<IProducts[]>){
            state.products = action.payload
          },
          addProducts(state,action:PayloadAction<IProducts>){
            state.products = state.products.concat(action.payload);
          },
          removeProducts(state,action:PayloadAction<IFavourites>){
            if(state.products.length <=1){
              state.products = [];
            }else{
              const newProduct = state.products.filter((item)=>{
                if(item.id !== action.payload.id){
                  return item;
                }
              })
              state.products = newProduct;
            }
          }
      }
  })
export const {saveProducts,addProducts,removeProducts} = productSlice.actions
export default productSlice.reducer