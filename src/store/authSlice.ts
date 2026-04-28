import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuthorized: false },
    reducers: {
        setAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
        logoutAuth: (state) => {
            state.isAuthorized = false;
        }
    }
})

export const { setAuthorized, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
