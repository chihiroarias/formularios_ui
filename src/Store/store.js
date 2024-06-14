import { configureStore } from "@reduxjs/toolkit";
import creacionCampoReducer from "../features/creacionCampo";
export const store = configureStore({
  reducer: {
    creacionCampo: creacionCampoReducer,
  },
});
