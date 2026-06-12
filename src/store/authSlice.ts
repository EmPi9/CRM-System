import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        isAuthorized: false,
        roleUser: [''],
    },
    reducers: {
        setAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
        setRoleUser: (state, action: PayloadAction<string[]>) => {
            state.roleUser = action.payload;
        },
        logoutAuth: (state) => {
            state.isAuthorized = false;
            state.roleUser = [''];
        }
    }
})

export const { setAuthorized, setRoleUser, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
