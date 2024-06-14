import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  configCampos: [],
};

export const creacionSlice = createSlice({
  name: "configCampos",
  initialState: initalState,
  reducers: {
    setConfigCampos: (state, action) => {
      state.configCampos = action.payload;
    },
    setConfigUnCampo: (state, action) => {
      state.configCampos = [...state.configCampos, action.payload];
    },
    deleteConfigUnCampo: (state, action) => {
      state.configCampos = state.configCampos.filter(
        (obj) => obj.id !== action.payload.id
      );
    },
  },
});

export const { setConfigCampos } = creacionSlice.actions;
export default creacionSlice.reducer;
