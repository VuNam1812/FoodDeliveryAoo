const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  selectedTab: 'Home',
};

const slice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setSelectedTab: (state, {payload}) => {
      state.selectedTab = payload;
    },
  },
  extraReducers: {},
});
export const {setSelectedTab} = slice.actions;
export default slice.reducer;
