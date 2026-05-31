import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        isAuthorized: false,
        isAdmin: false,
        isModerator: false
    },
    reducers: {
        setAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
        setIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        },
        setIsModrator: (state, action: PayloadAction<boolean>) => {
            state.isModerator = action.payload;
        },
        logoutAuth: (state) => {
            state.isAuthorized = false;
            state.isModerator = false;
            state.isAdmin = false;
        }
    }
})

export const { setAuthorized, setIsAdmin, setIsModrator, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
