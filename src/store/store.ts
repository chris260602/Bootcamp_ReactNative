import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductReducer from "./ProductReducer/ProductReducer";
import FavouriteReducer from "./FavouriteReducer/FavouriteReducer";


const persistConfig = {
    key:"root",
    storage: AsyncStorage
}
const rootReducer = combineReducers({
    product: ProductReducer,
    favourite: FavouriteReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer);



const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false
    })
})

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export {store,persistor};