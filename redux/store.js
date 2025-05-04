import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favorites from "@/reducers/favorites";
import hero from "@/reducers/hero";

const rootReducer = combineReducers({ favorites, hero });

export { rootReducer, configureStore };
